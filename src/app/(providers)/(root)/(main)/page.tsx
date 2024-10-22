import { ProductCard } from "@/components/Card/ProductCard";
import { Product } from "@/types/product";

const MainPage = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "아이폰 14 Pro 팝니다",
      price: 890000,
      location: "서울 강남구",
      imageUrl: "https://picsum.photos/300/300?random=1",
      createdAt: "1일 전",
    },
    {
      id: 2,
      title: "애플워치 SE 2세대 미개봉",
      price: 300000,
      location: "서울 서초구",
      imageUrl: "https://picsum.photos/300/300?random=2",
      createdAt: "2일 전",
    },
    {
      id: 3,
      title: "맥북 프로 M1 스페이스 그레이",
      price: 1250000,
      location: "서울 송파구",
      imageUrl: "https://picsum.photos/300/300?random=3",
      createdAt: "3시간 전",
    },
    {
      id: 4,
      title: "에어팟 프로 2세대",
      price: 280000,
      location: "서울 강동구",
      imageUrl: "https://picsum.photos/300/300?random=4",
      createdAt: "방금 전",
    },
  ];

  return (
    <main className="w-full min-h-screen px-4 py-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default MainPage;
