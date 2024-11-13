import { formatPrice } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import PaymentButton from "./_components/PaymentButton";
interface Props {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      seller (
        id,
        email,
        nickname
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !product) {
    return null;
  }

  return product;
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  console.log("Product in Page:", product);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-primary-100 mb-4">
            {formatPrice(product.price)}
          </p>

          <div className="mb-4">
            <p className="text-gray-600">
              {formatDistanceToNow(new Date(product.created_at), {
                addSuffix: true,
                locale: ko,
              })}
            </p>
          </div>

          <div className="border-t pt-4 mb-6">
            <p className="text-lg">{product.description}</p>
          </div>

          <div className="border-t pt-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">판매자 정보</h2>
            <p className="text-gray-600">{product.seller.nickname}</p>
          </div>

          <div className="mt-auto">
            <PaymentButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
