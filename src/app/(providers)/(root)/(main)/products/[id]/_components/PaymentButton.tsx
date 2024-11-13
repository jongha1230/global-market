"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth.store";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface PaymentButtonProps {
  product: Product;
}

export default function PaymentButton({ product }: PaymentButtonProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  console.log("Product:", product); // 디버깅용 로그 추가
  console.log("User:", user); // 디버깅용 로그 추가

  const handlePayment = async () => {
    // 상품 정보 검증 추가
    if (!product || !product.id) {
      toast({
        title: "오류",
        description: "상품 정보를 찾을 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "로그인 필요",
        description: "로그인 후 구매가 가능합니다.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      console.log("Payment Request Data:", {
        // 디버깅용 로그 추가
        productId: product.id,
        userId: user.id,
        itemName: product.title,
        amount: product.price,
      });

      const response = await fetch("/api/payment/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          userId: user.id,
          itemName: product.title,
          amount: product.price,
        }),
      });

      console.log("Payment Response:", await response.clone().json()); // 디버깅용 로그 추가

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "결제 처리 중 오류가 발생했습니다.");
      }

      if (!data.next_redirect_pc_url) {
        throw new Error("결제 URL을 받지 못했습니다.");
      }

      window.location.href = data.next_redirect_pc_url;
    } catch (error) {
      console.error("Payment Error:", error); // 디버깅용 로그 추가
      toast({
        title: "오류",
        description:
          error instanceof Error
            ? error.message
            : "결제 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // product가 없는 경우 버튼 비활성화
  if (!product) {
    return null;
  }

  return (
    <Button
      onClick={handlePayment}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-6 text-lg"
      disabled={!product || !user || product.seller.id === user?.id}
    >
      {!product
        ? "상품 정보 없음"
        : product.seller.id === user?.id
        ? "자신의 상품입니다"
        : "카카오페이로 구매하기"}
    </Button>
  );
}
