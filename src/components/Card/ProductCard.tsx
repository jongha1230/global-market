import { formatPrice } from "@/lib/utils"; // 가격 포맷팅 유틸리티
import { Product } from "@/types/product";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const timeAgo = formatDistanceToNow(new Date(product.created_at), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <Link href={`/products/${product.id}`}>
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-600 mt-1">{formatPrice(product.price)}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {product.seller.nickname}
            </span>
            <span className="text-sm text-gray-500">{timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
