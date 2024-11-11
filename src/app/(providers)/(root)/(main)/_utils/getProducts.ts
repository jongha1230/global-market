import { createClient } from "@/supabase/server";

export async function getProducts() {
  const supabase = createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      *,
      users:seller (
        id,
        email
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products;
}
