import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

// 상품 카드 컴포넌트
export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="h-full transition-transform hover:-translate-y-1">
        <div className="p-0">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.title}
              className="object-cover rounded-t-lg"
              fill
              priority={false}
            />
          </div>
          <div className="p-3">
            <h3 className="text-16-medium truncate">{product.title}</h3>
            <p className="text-18-bold mt-1">
              {product.price.toLocaleString()}원
            </p>
            <div className="flex items-center mt-2 text-14-regular text-gray-500">
              <span>{product.location}</span>
              <span className="mx-1">•</span>
              <span>{product.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
