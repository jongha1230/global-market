import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
      <Link href="/" className="text-primary-100 hover:text-primary-100/80">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
