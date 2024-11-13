import { createClient } from "@/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    orderId: string;
    pg_token: string;
  };
}

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const { orderId, pg_token } = searchParams;

  if (!orderId || !pg_token) {
    redirect("/");
  }

  const supabase = createClient();

  // 주문 정보 조회
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    redirect("/");
  }

  // 카카오페이 결제 승인 처리
  try {
    const response = await fetch("https://kapi.kakao.com/v1/payment/approve", {
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        cid: "TC0ONETIME",
        tid: order.tid,
        partner_order_id: orderId,
        partner_user_id: order.buyer_id,
        pg_token,
      }),
    });

    if (!response.ok) {
      throw new Error("결제 승인 실패");
    }

    // 주문 상태 업데이트
    await supabase
      .from("orders")
      .update({ status: "COMPLETED" })
      .eq("id", orderId);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다</h1>
        <p className="text-gray-600 mb-8">주문번호: {orderId}</p>
        <Link href="/" className="text-primary-100 hover:text-primary-100/80">
          홈으로 돌아가기
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Payment approval error:", error);
    redirect("/payment/fail");
  }
}
