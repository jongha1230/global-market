export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  created_at: string;
  seller: {
    id: string;
    email: string;
    nickname: string;
  };
  description: string;
  status: "AVAILABLE" | "SOLD";
}
