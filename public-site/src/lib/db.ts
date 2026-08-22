import { MongoClient, Db } from "mongodb";
import {
  User,
  InsertUser,
  Product,
  ProductValues,
  Advertisement,
  AdvertisementValues,
  Inquiry,
  InquiryValues,
  Brand,
  BrandValues,
  City,
  CityValues,
  BusinessGuide,
  BusinessGuideValues,
  Review,
  ReviewValues,
  Setting
} from "./schema";

let _db: Db | null = null;
let _client: MongoClient | null = null;
let _connectAttempted = false;

const OWNER_OPEN_ID = process.env.OWNER_OPEN_ID || "";

function wrapDb(db: Db): Db {
  const dbAny = db as any;
  const originalCollection = dbAny.collection.bind(db);
  dbAny.collection = function (name: string, options?: any) {
    const col = originalCollection(name, options);
    
    const sanitize = (doc: any) => {
      if (!doc) return doc;
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    };

    const originalFind = col.find.bind(col);
    col.find = function (filter?: any, options?: any) {
      const cursor = originalFind(filter, options);
      const originalToArray = cursor.toArray.bind(cursor);
      cursor.toArray = async function () {
        const arr = await originalToArray();
        return arr.map(sanitize);
      };
      return cursor;
    };

    const originalFindOne = col.findOne.bind(col);
    col.findOne = async function (filter: any, options?: any) {
      const doc = await originalFindOne(filter, options);
      return sanitize(doc);
    };

    const originalFindOneAndUpdate = col.findOneAndUpdate.bind(col);
    col.findOneAndUpdate = async function (filter: any, update: any, options?: any) {
      if (update) {
        delete update._id;
        if (update.$set) {
          delete update.$set._id;
        }
      }
      const result = await originalFindOneAndUpdate(filter, update, options);
      if (!result) return result;
      const doc = result.value || result;
      if (doc) {
        if (result.value) {
          result.value = sanitize(doc);
        } else {
          return sanitize(doc);
        }
      }
      return result;
    };

    const originalInsertOne = col.insertOne.bind(col);
    col.insertOne = async function (doc: any, options?: any) {
      const res = await originalInsertOne(doc, options);
      sanitize(doc);
      return res;
    };

    return col;
  };
  return db;
}

export async function getDb(): Promise<Db | null> {
  if (_db) return _db;
  if (_connectAttempted) return null;

  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    _connectAttempted = true;
    try {
      _client = new MongoClient(dbUrl, {
        connectTimeoutMS: 3000,
        serverSelectionTimeoutMS: 3000,
      });
      await _client.connect();
      _db = wrapDb(_client.db());
      console.log("[Database] Connected to MongoDB successfully.");

      // Setup unique indexes to replicate SQL unique constraints
      await _db.collection("users").createIndex({ openId: 1 }, { unique: true });
      await _db.collection("himat_products").createIndex({ slug: 1 }, { unique: true });
      await _db.collection("himat_business_guides").createIndex({ slug: 1 }, { unique: true });
      await _db.collection("himat_cities").createIndex({ name: 1 }, { unique: true });
      await _db.collection("himat_settings").createIndex({ key: 1 }, { unique: true });

      // Seed Google reviews if collection is empty
      const reviewsCount = await _db.collection("himat_reviews").countDocuments();
      if (reviewsCount === 0) {
        const seedReviews = [
          { id: 1, author: "Jharnadevi Dabnath (Assam Retailer)", rating: 5, text: "Hey I m from Assam n I must say it's a wonderful experience n one of the best agent of garments...jodi apunaluke kiba unique design bisarise nischoi teulukok contact korok...dhoynobad☺️", date: "5 months ago", isActive: true, createdAt: new Date() },
          { id: 2, author: "ritik monga (Delhi Wholesale Customer)", rating: 5, text: "I am from delhi. I got the best services from himmat textile. Thanks for the support sir", date: "a month ago", isActive: true, createdAt: new Date() },
          { id: 3, author: "Mahendra Chandrana (Goa Boutique Owner)", rating: 5, text: "I am from Goa. One of the best work in ahmedabad", date: "3 months ago", isActive: true, createdAt: new Date() },
          { id: 4, author: "Mohit Duggad (Chhattisgarh Client)", rating: 5, text: "I am from 36garh. Best team and best agent in Ahmedabad", date: "2 months ago", isActive: true, createdAt: new Date() },
          { id: 5, author: "Debasish Neogi (Verified Buyer)", rating: 5, text: "I recently made a purchase from Himat Textile in Ahmedabad and was thoroughly impressed with the exceptional service I received! The team was knowledgeable, helpful, and ensured a seamless experience. The quality of their products is outstanding.", date: "a year ago", isActive: true, createdAt: new Date() }
        ];
        await _db.collection("himat_reviews").insertMany(seedReviews);
        console.log("[Database] Seeded 5 real Google reviews successfully.");
      }
    } catch (error) {
      console.warn("[Database] Failed to connect to MongoDB, falling back to memory store:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * Sequential ID generator helper.
 * Simulates SQL auto-increment in MongoDB.
 */
async function getNextSequence(name: string, db: Db): Promise<number> {
  try {
    const result = await db.collection<{ _id: string; seq: number }>("counters").findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );
    const doc = result as any;
    const seq = doc && typeof doc.seq === "number" ? doc.seq : (doc && doc.value && typeof doc.value.seq === "number" ? doc.value.seq : null);
    if (seq === null) {
      const updated = await db.collection<{ _id: string; seq: number }>("counters").findOne({ _id: name });
      return updated ? (updated as any).seq : 1;
    }
    return seq;
  } catch (error) {
    console.error(`[Database] Error getting next sequence for ${name}:`, error);
    return Math.floor(Math.random() * 1000000);
  }
}

// =============================================================================
// Memory Fallback Store (for development without database)
// =============================================================================
const mockCities: City[] = [
  { id: 1, name: "Ahmedabad", latitude: "23.0225", longitude: "72.5714", isActive: true, createdAt: new Date() },
  { id: 2, name: "Delhi", latitude: "28.7041", longitude: "77.1025", isActive: true, createdAt: new Date() },
  { id: 3, name: "Mumbai", latitude: "19.0760", longitude: "72.8777", isActive: true, createdAt: new Date() },
  { id: 4, name: "Nagpur", latitude: "21.1458", longitude: "79.0882", isActive: true, createdAt: new Date() },
  { id: 5, name: "Ludhiana", latitude: "30.9010", longitude: "75.8573", isActive: true, createdAt: new Date() },
  { id: 6, name: "Jaipur", latitude: "26.9124", longitude: "75.7873", isActive: true, createdAt: new Date() },
  { id: 7, name: "Bangalore", latitude: "12.9716", longitude: "77.5946", isActive: true, createdAt: new Date() },
];

const mockReviews: Review[] = [
  { id: 1, author: "Jharnadevi Dabnath (Assam Retailer)", rating: 5, text: "Hey I m from Assam n I must say it's a wonderful experience n one of the best agent of garments...jodi apunaluke kiba unique design bisarise nischoi teulukok contact korok...dhoynobad☺️", date: "5 months ago", isActive: true, createdAt: new Date() },
  { id: 2, author: "ritik monga (Delhi Wholesale Customer)", rating: 5, text: "I am from delhi. I got the best services from himmat textile. Thanks for the support sir", date: "a month ago", isActive: true, createdAt: new Date() },
  { id: 3, author: "Mahendra Chandrana (Goa Boutique Owner)", rating: 5, text: "I am from Goa. One of the best work in ahmedabad", date: "3 months ago", isActive: true, createdAt: new Date() },
  { id: 4, author: "Mohit Duggad (Chhattisgarh Client)", rating: 5, text: "I am from 36garh. Best team and best agent in Ahmedabad", date: "2 months ago", isActive: true, createdAt: new Date() },
  { id: 5, author: "Debasish Neogi (Verified Buyer)", rating: 5, text: "I recently made a purchase from Himat Textile in Ahmedabad and was thoroughly impressed with the exceptional service I received! The team was knowledgeable, helpful, and ensured a seamless experience. The quality of their products is outstanding.", date: "a year ago", isActive: true, createdAt: new Date() }
];

const mockGuides: BusinessGuide[] = [
  {
    id: 1,
    slug: "how-to-start-a-garment-business",
    title: "How to Start a Garment Business",
    content: "Starting a garment business in India requires deep understanding of sourcing hubs, fabrics, and customer sizing preferences. Learn how to map out initial designs, choose the right garment manufacturing partner, and manage stock replenishment cycles effectively.",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
    coverImageKey: null,
    status: "PUBLISHED",
    views: 128,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    slug: "wholesale-vs-private-label",
    title: "Wholesale vs Private Label Sourcing",
    content: "B2B buyers face a choice between purchasing stock catalogs (wholesale) or manufacturing customized garments under their own label (private-label). Wholesale is fast and has lower MOQ, while private-label builds brand equity. Read this breakdown to decide.",
    coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600",
    coverImageKey: null,
    status: "PUBLISHED",
    views: 94,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

const mockProducts: Product[] = [
  { id: 1, title: "Premium Cotton Polo Shirts", slug: "premium-cotton-polo", category: "mens wear", fabricDetails: "100% Pique Cotton, 220 GSM, Bio-washed", moq: "200 Pcs", style: "Casual Smart", targetMarket: "Urban Men", description: "Premium quality pique polo shirts with double-needle stitching, rib-knit collar, and fade-resistant dye. Perfect for wholesale distribution and private labeling.", imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600", imageKey: null, isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: "Vintage Indigo Denim Jackets", slug: "vintage-indigo-denim-jacket", category: "womens wear", fabricDetails: "12 oz Slub Denim, 100% Cotton", moq: "100 Pcs", style: "Classic Trucker Jacket", targetMarket: "Youth / Unisex", description: "Heavy-duty denim jackets with classic button closures, adjustable waist tabs, and premium metal buttons. Heavily reinforced pockets for longevity.", imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600", imageKey: null, isActive: true, createdAt: new Date(), updatedAt: new Date() },
];

const mockAdvertisements: Advertisement[] = [
  {
    id: 1,
    title: "Built for the Business of Fashion",
    description: "Your B2B garment partner for wholesale, private label, and growing fashion brands.",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
    mobileImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
    imageKey: null,
    linkUrl: "/#enquiry",
    buttonText: "Start Enquiry",
    placement: "hero",
    type: "slide",
    priority: 1,
    targetCities: "[]",
    isActive: true,
    status: "ACTIVE",
    startsAt: null,
    endsAt: null,
    impressions: 1250,
    clicks: 120,
    whatsappClicks: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockBrands: Brand[] = [
  { id: 1, name: "FashionHub", logoUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=120", logoKey: null, isActive: true, createdAt: new Date() },
  { id: 2, name: "StitchCrafters", logoUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=120", logoKey: null, isActive: true, createdAt: new Date() }
];

const memoryStore = {
  users: [] as User[],
  products: mockProducts,
  advertisements: mockAdvertisements,
  inquiries: [] as Inquiry[],
  brands: mockBrands,
  cities: mockCities,
  businessGuides: mockGuides,
  reviews: mockReviews,
  settings: [] as Setting[],
};

// =============================================================================
// Database Helpers / Logic
// =============================================================================

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) {
    const existing = memoryStore.users.find(u => u.openId === user.openId);
    if (existing) {
      Object.assign(existing, user, { updatedAt: new Date() });
    } else {
      memoryStore.users.push({
        id: memoryStore.users.length + 1,
        openId: user.openId,
        name: user.name ?? null,
        email: user.email ?? null,
        loginMethod: user.loginMethod ?? null,
        role: user.openId === OWNER_OPEN_ID ? "admin" : (user.role ?? "user"),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date()
      });
    }
    return;
  }

  try {
    const filter = { openId: user.openId };
    const existing = await db.collection("users").findOne(filter);

    const updateSet: Record<string, any> = {};
    const textFields = ["name", "email", "loginMethod"] as const;

    textFields.forEach(field => {
      const value = user[field];
      if (value !== undefined) {
        updateSet[field] = value ?? null;
      }
    });

    if (user.lastSignedIn !== undefined) {
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      updateSet.role = user.role;
    } else if (user.openId === OWNER_OPEN_ID) {
      updateSet.role = 'admin';
    }

    if (!updateSet.lastSignedIn) updateSet.lastSignedIn = new Date();
    updateSet.updatedAt = new Date();

    if (existing) {
      await db.collection("users").updateOne(filter, { $set: updateSet });
    } else {
      const id = await getNextSequence("users", db);
      const newUser: User = {
        id,
        openId: user.openId,
        name: updateSet.name ?? null,
        email: updateSet.email ?? null,
        loginMethod: updateSet.loginMethod ?? null,
        role: user.openId === OWNER_OPEN_ID ? "admin" : (user.role ?? "user"),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: updateSet.lastSignedIn
      };
      await db.collection("users").insertOne(newUser);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    if (openId === OWNER_OPEN_ID) {
      return {
        id: 999,
        openId,
        name: "Himat Admin",
        email: "admin@himattextile.com",
        loginMethod: "mock",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date()
      };
    }
    return memoryStore.users.find(u => u.openId === openId);
  }
  const result = await db.collection("users").findOne({ openId });
  return result ? (result as any as User) : undefined;
}

// =============================================================================
// Product Catalog Helpers
// =============================================================================

export async function listPublicProducts(category?: Product["category"]): Promise<Product[]> {
  const db = await getDb();
  if (!db) {
    return memoryStore.products.filter(p => p.isActive && (!category || p.category === category));
  }
  const query: Record<string, any> = { isActive: true };
  if (category) {
    query.category = category;
  }
  const results = await db.collection("himat_products")
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
  return results as any[] as Product[];
}

export async function listAdminProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return memoryStore.products;
  const results = await db.collection("himat_products")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return results as any[] as Product[];
}

export async function createProduct(values: ProductValues): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) {
    const product: Product = {
      id: memoryStore.products.length + 1,
      title: values.title,
      slug: values.slug,
      category: values.category,
      fabricDetails: values.fabricDetails,
      moq: values.moq,
      description: values.description,
      imageUrl: values.imageUrl ?? null,
      imageKey: values.imageKey ?? null,
      style: values.style ?? null,
      targetMarket: values.targetMarket ?? null,
      isActive: values.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryStore.products.push(product);
    return product;
  }
  const id = await getNextSequence("products", db);
  const now = new Date();
  const product = {
    id,
    title: values.title,
    slug: values.slug,
    category: values.category,
    fabricDetails: values.fabricDetails,
    moq: values.moq,
    description: values.description,
    imageUrl: values.imageUrl ?? null,
    imageKey: values.imageKey ?? null,
    style: values.style ?? null,
    targetMarket: values.targetMarket ?? null,
    isActive: values.isActive ?? true,
    createdAt: now,
    updatedAt: now
  };
  await db.collection("himat_products").insertOne(product);
  return product as any as Product;
}

export async function updateProduct(id: number, values: Partial<ProductValues>): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) {
    const idx = memoryStore.products.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    memoryStore.products[idx] = { ...memoryStore.products[idx], ...values, updatedAt: new Date() };
    return memoryStore.products[idx];
  }
  const updateData = {
    ...values,
    updatedAt: new Date()
  };
  const result = await db.collection("himat_products").findOneAndUpdate(
    { id },
    { $set: updateData },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as Product;
}

export async function deleteProduct(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.products = memoryStore.products.filter(p => p.id !== id);
    return;
  }
  await db.collection("himat_products").deleteOne({ id });
}

// =============================================================================
// Advertisements CMS Helpers
// =============================================================================

export async function listPublicAdvertisements(): Promise<Advertisement[]> {
  const db = await getDb();
  const now = new Date();
  if (!db) {
    return memoryStore.advertisements.filter(ad =>
      ad.isActive &&
      ad.status === "ACTIVE" &&
      (!ad.startsAt || ad.startsAt <= now) &&
      (!ad.endsAt || ad.endsAt >= now)
    );
  }
  const rows = await db.collection("himat_advertisements")
    .find({ isActive: true, status: "ACTIVE" })
    .sort({ priority: -1, createdAt: -1 })
    .toArray();
  return rows.filter(ad =>
    (!ad.startsAt || new Date(ad.startsAt) <= now) &&
    (!ad.endsAt || new Date(ad.endsAt) >= now)
  ) as any[] as Advertisement[];
}

export async function listAdminAdvertisements(): Promise<Advertisement[]> {
  const db = await getDb();
  if (!db) return memoryStore.advertisements;
  const results = await db.collection("himat_advertisements")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return results as any[] as Advertisement[];
}

export async function createAdvertisement(values: AdvertisementValues): Promise<Advertisement | undefined> {
  const db = await getDb();
  if (!db) {
    const ad: Advertisement = {
      id: memoryStore.advertisements.length + 1,
      title: values.title,
      imageUrl: values.imageUrl,
      description: values.description ?? null,
      mobileImage: values.mobileImage ?? null,
      imageKey: values.imageKey ?? null,
      linkUrl: values.linkUrl ?? null,
      buttonText: values.buttonText ?? null,
      placement: values.placement ?? "homepage",
      type: "banner",
      priority: 0,
      targetCities: "[]",
      isActive: true,
      status: "ACTIVE",
      startsAt: values.startsAt ?? null,
      endsAt: values.endsAt ?? null,
      impressions: 0,
      clicks: 0,
      whatsappClicks: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryStore.advertisements.push(ad);
    return ad;
  }
  const id = await getNextSequence("advertisements", db);
  const now = new Date();
  const ad = {
    id,
    title: values.title,
    imageUrl: values.imageUrl,
    description: values.description ?? null,
    mobileImage: values.mobileImage ?? null,
    imageKey: values.imageKey ?? null,
    linkUrl: values.linkUrl ?? null,
    buttonText: values.buttonText ?? null,
    placement: values.placement ?? "homepage",
    type: "banner",
    priority: 0,
    targetCities: "[]",
    isActive: true,
    status: "ACTIVE",
    startsAt: values.startsAt ?? null,
    endsAt: values.endsAt ?? null,
    impressions: 0,
    clicks: 0,
    whatsappClicks: 0,
    createdAt: now,
    updatedAt: now
  };
  await db.collection("himat_advertisements").insertOne(ad);
  return ad as any as Advertisement;
}

export async function updateAdvertisement(id: number, values: Partial<AdvertisementValues>): Promise<Advertisement | undefined> {
  const db = await getDb();
  if (!db) {
    const idx = memoryStore.advertisements.findIndex(ad => ad.id === id);
    if (idx === -1) return undefined;
    memoryStore.advertisements[idx] = { ...memoryStore.advertisements[idx], ...values, updatedAt: new Date() };
    return memoryStore.advertisements[idx];
  }
  const updateData = {
    ...values,
    updatedAt: new Date()
  };
  const result = await db.collection("himat_advertisements").findOneAndUpdate(
    { id },
    { $set: updateData },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as Advertisement;
}

export async function deleteAdvertisement(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.advertisements = memoryStore.advertisements.filter(ad => ad.id !== id);
    return;
  }
  await db.collection("himat_advertisements").deleteOne({ id });
}

// Analytical loggers
export async function recordImpression(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    const ad = memoryStore.advertisements.find(a => a.id === id);
    if (ad) ad.impressions++;
    return;
  }
  await db.collection("himat_advertisements").updateOne({ id }, { $inc: { impressions: 1 } });
}

export async function recordClick(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    const ad = memoryStore.advertisements.find(a => a.id === id);
    if (ad) ad.clicks++;
    return;
  }
  await db.collection("himat_advertisements").updateOne({ id }, { $inc: { clicks: 1 } });
}

export async function recordWhatsappClick(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    const ad = memoryStore.advertisements.find(a => a.id === id);
    if (ad) ad.whatsappClicks++;
    return;
  }
  await db.collection("himat_advertisements").updateOne({ id }, { $inc: { whatsappClicks: 1 } });
}

// =============================================================================
// Brands CMS Helpers
// =============================================================================

export async function listPublicBrands(): Promise<Brand[]> {
  const db = await getDb();
  if (!db) return memoryStore.brands.filter(b => b.isActive);
  const results = await db.collection("himat_brands").find({ isActive: true }).toArray();
  return results as any[] as Brand[];
}

export async function listAdminBrands(): Promise<Brand[]> {
  const db = await getDb();
  if (!db) return memoryStore.brands;
  const results = await db.collection("himat_brands").find().toArray();
  return results as any[] as Brand[];
}

export async function createBrand(values: BrandValues): Promise<Brand | undefined> {
  const db = await getDb();
  if (!db) {
    const b: Brand = { id: memoryStore.brands.length + 1, name: values.name, logoUrl: values.logoUrl, logoKey: values.logoKey ?? null, isActive: values.isActive ?? true, createdAt: new Date() };
    memoryStore.brands.push(b);
    return b;
  }
  const id = await getNextSequence("brands", db);
  const brand = {
    id,
    name: values.name,
    logoUrl: values.logoUrl,
    logoKey: values.logoKey ?? null,
    isActive: values.isActive ?? true,
    createdAt: new Date()
  };
  await db.collection("himat_brands").insertOne(brand);
  return brand as any as Brand;
}

export async function updateBrand(id: number, values: Partial<BrandValues>): Promise<Brand | undefined> {
  const db = await getDb();
  if (!db) {
    const idx = memoryStore.brands.findIndex(b => b.id === id);
    if (idx === -1) return undefined;
    memoryStore.brands[idx] = { ...memoryStore.brands[idx], ...values };
    return memoryStore.brands[idx];
  }
  const result = await db.collection("himat_brands").findOneAndUpdate(
    { id },
    { $set: values },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as Brand;
}

export async function deleteBrand(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.brands = memoryStore.brands.filter(b => b.id !== id);
    return;
  }
  await db.collection("himat_brands").deleteOne({ id });
}

// =============================================================================
// Cities CMS Helpers
// =============================================================================

export async function listPublicCities(): Promise<City[]> {
  const db = await getDb();
  if (!db) return memoryStore.cities.filter(c => c.isActive);
  const results = await db.collection("himat_cities").find({ isActive: true }).toArray();
  return results as any[] as City[];
}

export async function listAdminCities(): Promise<City[]> {
  const db = await getDb();
  if (!db) return memoryStore.cities;
  const results = await db.collection("himat_cities").find().toArray();
  return results as any[] as City[];
}

export async function createCity(values: CityValues): Promise<City | undefined> {
  const db = await getDb();
  if (!db) {
    const c: City = { id: memoryStore.cities.length + 1, name: values.name, latitude: values.latitude ?? null, longitude: values.longitude ?? null, isActive: values.isActive ?? true, createdAt: new Date() };
    memoryStore.cities.push(c);
    return c;
  }
  const id = await getNextSequence("cities", db);
  const city = {
    id,
    name: values.name,
    latitude: values.latitude ?? null,
    longitude: values.longitude ?? null,
    isActive: values.isActive ?? true,
    createdAt: new Date()
  };
  await db.collection("himat_cities").insertOne(city);
  return city as any as City;
}

export async function updateCity(id: number, values: Partial<CityValues>): Promise<City | undefined> {
  const db = await getDb();
  if (!db) {
    const idx = memoryStore.cities.findIndex(c => c.id === id);
    if (idx === -1) return undefined;
    memoryStore.cities[idx] = { ...memoryStore.cities[idx], ...values };
    return memoryStore.cities[idx];
  }
  const result = await db.collection("himat_cities").findOneAndUpdate(
    { id },
    { $set: values },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as City;
}

export async function deleteCity(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.cities = memoryStore.cities.filter(c => c.id !== id);
    return;
  }
  await db.collection("himat_cities").deleteOne({ id });
}

// =============================================================================
// Business Guides CMS Helpers
// =============================================================================

export async function listPublicBusinessGuides(): Promise<BusinessGuide[]> {
  const db = await getDb();
  if (!db) return memoryStore.businessGuides.filter(g => g.status === "PUBLISHED" || g.status === "published");
  const results = await db.collection("himat_business_guides")
    .find({ status: { $in: ["PUBLISHED", "published"] } })
    .sort({ createdAt: -1 })
    .toArray();
  return results as any[] as BusinessGuide[];
}

export async function listAdminBusinessGuides(): Promise<BusinessGuide[]> {
  const db = await getDb();
  if (!db) return memoryStore.businessGuides;
  const results = await db.collection("himat_business_guides")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return results as any[] as BusinessGuide[];
}

export async function getBusinessGuideBySlug(slug: string): Promise<BusinessGuide | undefined> {
  const db = await getDb();
  if (!db) return memoryStore.businessGuides.find(g => g.slug === slug);
  const doc = await db.collection("himat_business_guides").findOne({ slug });
  return doc ? (doc as any as BusinessGuide) : undefined;
}

export async function createBusinessGuide(values: BusinessGuideValues): Promise<BusinessGuide | undefined> {
  const db = await getDb();
  const normalizedStatus = (values.status ?? "PUBLISHED").toUpperCase();
  if (!db) {
    const g: BusinessGuide = {
      id: memoryStore.businessGuides.length + 1,
      slug: values.slug,
      title: values.title,
      content: values.content,
      coverImage: values.coverImage ?? null,
      coverImageKey: values.coverImageKey ?? null,
      status: normalizedStatus,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryStore.businessGuides.push(g);
    return g;
  }
  const id = await getNextSequence("business_guides", db);
  const now = new Date();
  const guide = {
    id,
    slug: values.slug,
    title: values.title,
    content: values.content,
    coverImage: values.coverImage ?? null,
    coverImageKey: values.coverImageKey ?? null,
    status: normalizedStatus,
    views: 0,
    createdAt: now,
    updatedAt: now
  };
  await db.collection("himat_business_guides").insertOne(guide);
  return guide as any as BusinessGuide;
}

export async function updateBusinessGuide(id: number, values: Partial<BusinessGuideValues>): Promise<BusinessGuide | undefined> {
  const db = await getDb();
  const normalizedStatus = values.status ? values.status.toUpperCase() : undefined;
  if (!db) {
    const idx = memoryStore.businessGuides.findIndex(g => g.id === id);
    if (idx === -1) return undefined;
    const updateValues = { ...values };
    if (normalizedStatus) updateValues.status = normalizedStatus;
    memoryStore.businessGuides[idx] = { ...memoryStore.businessGuides[idx], ...updateValues, updatedAt: new Date() };
    return memoryStore.businessGuides[idx];
  }
  const updateData: any = {
    ...values,
    updatedAt: new Date()
  };
  if (normalizedStatus) {
    updateData.status = normalizedStatus;
  }
  const result = await db.collection("himat_business_guides").findOneAndUpdate(
    { id },
    { $set: updateData },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as BusinessGuide;
}

export async function deleteBusinessGuide(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.businessGuides = memoryStore.businessGuides.filter(g => g.id !== id);
    return;
  }
  await db.collection("himat_business_guides").deleteOne({ id });
}

export async function recordGuideView(slug: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    const g = memoryStore.businessGuides.find(bg => bg.slug === slug);
    if (g) g.views++;
    return;
  }
  await db.collection("himat_business_guides").updateOne({ slug }, { $inc: { views: 1 } });
}

// =============================================================================
// Reviews CMS Helpers
// =============================================================================

export async function listPublicReviews(): Promise<Review[]> {
  const db = await getDb();
  if (!db) return memoryStore.reviews.filter(r => r.isActive);
  const results = await db.collection("himat_reviews").find({ isActive: true }).toArray();
  return results as any[] as Review[];
}

export async function listAdminReviews(): Promise<Review[]> {
  const db = await getDb();
  if (!db) return memoryStore.reviews;
  const results = await db.collection("himat_reviews").find().toArray();
  return results as any[] as Review[];
}

export async function createReview(values: ReviewValues): Promise<Review | undefined> {
  const db = await getDb();
  if (!db) {
    const r: Review = { id: memoryStore.reviews.length + 1, author: values.author, rating: values.rating ?? 5, text: values.text, date: values.date ?? null, isActive: values.isActive ?? true, createdAt: new Date() };
    memoryStore.reviews.push(r);
    return r;
  }
  const id = await getNextSequence("reviews", db);
  const review = {
    id,
    author: values.author,
    rating: values.rating ?? 5,
    text: values.text,
    date: values.date ?? null,
    isActive: values.isActive ?? true,
    createdAt: new Date()
  };
  await db.collection("himat_reviews").insertOne(review);
  return review as any as Review;
}

export async function updateReview(id: number, values: Partial<ReviewValues>): Promise<Review | undefined> {
  const db = await getDb();
  if (!db) {
    const idx = memoryStore.reviews.findIndex(r => r.id === id);
    if (idx === -1) return undefined;
    memoryStore.reviews[idx] = { ...memoryStore.reviews[idx], ...values };
    return memoryStore.reviews[idx];
  }
  const result = await db.collection("himat_reviews").findOneAndUpdate(
    { id },
    { $set: values },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as Review;
}

export async function deleteReview(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.reviews = memoryStore.reviews.filter(r => r.id !== id);
    return;
  }
  await db.collection("himat_reviews").deleteOne({ id });
}

// =============================================================================
// Settings CMS Helpers
// =============================================================================
export async function getSetting(key: string, defaultValue = ""): Promise<string> {
  const db = await getDb();
  if (!db) {
    return memoryStore.settings.find(s => s.key === key)?.value ?? defaultValue;
  }
  const result = await db.collection("himat_settings").findOne({ key });
  return result ? (result as any).value : defaultValue;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    const existing = memoryStore.settings.find(s => s.key === key);
    if (existing) {
      existing.value = value;
    } else {
      memoryStore.settings.push({ id: memoryStore.settings.length + 1, key, value, updatedAt: new Date() });
    }
    return;
  }
  await db.collection("himat_settings").updateOne(
    { key },
    { $set: { value, updatedAt: new Date() } },
    { upsert: true }
  );
}

export async function listSettings(): Promise<Setting[]> {
  const db = await getDb();
  if (!db) return memoryStore.settings;
  const results = await db.collection("himat_settings").find().toArray();
  return results as any[] as Setting[];
}

// =============================================================================
// Inquiry Helpers
// =============================================================================

export async function createInquiry(values: InquiryValues): Promise<Inquiry | undefined> {
  const db = await getDb();
  if (!db) {
    const inquiry: Inquiry = {
      id: memoryStore.inquiries.length + 1,
      companyName: values.companyName,
      contactName: values.contactName ?? null,
      email: values.email ?? null,
      phone: values.phone ?? null,
      productInterest: values.productInterest,
      quantity: values.quantity,
      message: values.message,
      status: values.status ?? "NEW",
      adminNotes: values.adminNotes ?? null,
      createdAt: new Date()
    };
    memoryStore.inquiries.push(inquiry);
    return inquiry;
  }
  const id = await getNextSequence("inquiries", db);
  const inquiry = {
    id,
    companyName: values.companyName,
    contactName: values.contactName ?? null,
    email: values.email ?? null,
    phone: values.phone ?? null,
    productInterest: values.productInterest,
    quantity: values.quantity,
    message: values.message,
    status: values.status ?? "NEW",
    adminNotes: values.adminNotes ?? null,
    createdAt: new Date()
  };
  await db.collection("himat_inquiries").insertOne(inquiry);
  return inquiry as any as Inquiry;
}

export async function listInquiries(): Promise<Inquiry[]> {
  const db = await getDb();
  if (!db) return memoryStore.inquiries;
  const results = await db.collection("himat_inquiries")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return results as any[] as Inquiry[];
}

export async function updateInquiry(
  id: number,
  values: { status?: "NEW" | "REPLIED" | "ARCHIVED"; adminNotes?: string | null }
): Promise<Inquiry | undefined> {
  const db = await getDb();
  if (!db) {
    const inquiry = memoryStore.inquiries.find(i => i.id === id);
    if (inquiry) {
      if (values.status !== undefined) inquiry.status = values.status;
      if (values.adminNotes !== undefined) inquiry.adminNotes = values.adminNotes;
    }
    return inquiry;
  }
  const updateDoc: Record<string, any> = {};
  if (values.status !== undefined) updateDoc.status = values.status;
  if (values.adminNotes !== undefined) updateDoc.adminNotes = values.adminNotes;

  const result = await db.collection("himat_inquiries").findOneAndUpdate(
    { id },
    { $set: updateDoc },
    { returnDocument: "after" }
  );
  if (!result) return undefined;
  const doc = (result as any).value || result;
  return doc as any as Inquiry;
}

export async function deleteInquiry(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    memoryStore.inquiries = memoryStore.inquiries.filter(i => i.id !== id);
    return;
  }
  await db.collection("himat_inquiries").deleteOne({ id });
}
