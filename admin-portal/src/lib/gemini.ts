const geminiApiKey = process.env.GEMINI_API_KEY;
const forgeApiKey = process.env.BUILT_IN_FORGE_API_KEY;
const forgeApiUrl = process.env.BUILT_IN_FORGE_API_URL;

export async function generateProductDescription(input: {
  fabricType: string;
  style: string;
  targetMarket: string;
}): Promise<string> {
  const apiKey = geminiApiKey || forgeApiKey;
  if (!apiKey) {
    throw new Error("Sourcing Description API key not configured. Set GEMINI_API_KEY or BUILT_IN_FORGE_API_KEY.");
  }

  const url = geminiApiKey 
    ? "https://generativelanguage.googleapis.com/v1beta/openai/v1/chat/completions"
    : (forgeApiUrl 
      ? `${forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`
      : "https://generativelanguage.googleapis.com/v1beta/openai/v1/chat/completions");

  const model = geminiApiKey ? "gemini-2.5-flash" : "gpt-5-mini";

  const payload = {
    model,
    max_tokens: 320,
    messages: [
      { role: "system", content: "You write precise B2B garment product copy. Return plain text only. Do not invent certifications, prices, production capacity, locations, lead times, sustainability claims, or material specifications not provided." },
      { role: "user", content: `Write one polished 90–120 word product description for Himat Textile. Fabric type: ${input.fabricType}. Garment style: ${input.style}. Target market: ${input.targetMarket}. Address wholesale and private-label buyers in an authoritative, specific but non-fabricated tone.` },
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM invocation failed: ${response.status} - ${text}`);
  }

  const result = await response.json() as any;
  const content = result.choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}
export async function listLLMModels(): Promise<string[]> {
  return ["gemini-2.5-flash", "gemini-1.5-flash", "gpt-5-mini"];
}
