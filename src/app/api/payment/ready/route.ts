import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productId, userId, itemName, amount } = await req.json();
    const orderId = `ORDER_${Date.now()}_${userId}`;

    const response = await fetch("https://kapi.kakao.com/v1/payment/ready", {
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        cid: process.env.KAKAO_CID || "TC0ONETIME",
        partner_order_id: orderId,
        partner_user_id: userId,
        item_name: itemName,
        quantity: "1",
        total_amount: amount.toString(),
        tax_free_amount: "0",
        approval_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?orderId=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`,
      }).toString(),
    });

    if (!response.ok) {
      console.error("Kakao Pay API Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error("결제 요청 처리 실패");
    }

    const paymentData = await response.json();

    return NextResponse.json(paymentData);
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "결제 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
