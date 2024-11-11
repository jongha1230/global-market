import { ProductCard } from "@/components/Card/ProductCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getProducts } from "./_utils/getProducts";

export default async function MainPage() {
  const products = await getProducts();

  return (
    <main className="w-full min-h-screen px-4 py-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href="/products/new"
        className="fixed bottom-10 right-36 w-14 h-14 bg-primary-10 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Plus size={24} color="black" />
        <span className="sr-only">상품 등록하기</span>
      </Link>
    </main>
  );
}
