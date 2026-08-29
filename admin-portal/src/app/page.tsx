import {
  listInquiries,
  listAdminProducts,
  listAdminAdvertisements,
  listAdminReviews,
  listAdminBrands,
  listAdminCities,
  listAdminBusinessGuides,
  listSettings,
  listAdminCategories
} from "@/lib/db";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    inquiries,
    products,
    advertisements,
    reviews,
    brands,
    cities,
    guides,
    settings,
    categories
  ] = await Promise.all([
    listInquiries(),
    listAdminProducts(),
    listAdminAdvertisements(),
    listAdminReviews(),
    listAdminBrands(),
    listAdminCities(),
    listAdminBusinessGuides(),
    listSettings(),
    listAdminCategories()
  ]);

  return (
    <AdminDashboardClient
      initialInquiries={inquiries}
      initialProducts={products}
      initialAdvertisements={advertisements}
      initialReviews={reviews}
      initialBrands={brands}
      initialCities={cities}
      initialGuides={guides}
      initialSettings={settings}
      initialCategories={categories}
    />
  );
}
