"use client";

import { useAuthStore } from "@/stores/auth.store";
import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";

import { ProductCard } from "@/components/Card/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";

export default function MyPage() {
  const { user } = useAuthStore();
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myPurchases, setMyPurchases] = useState<
    {
      product: Product;
      status: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchMyData = async () => {
      const supabase = createClient();

      // 내가 등록한 상품
      const { data: products } = await supabase
        .from("products")
        .select("*, seller:seller(*)")
        .eq("seller_id", user?.id);

      // 내가 구매한 상품
      const { data: purchases } = await supabase
        .from("orders")
        .select("*, product:product_id(*)")
        .eq("buyer_id", user?.id)
        .eq("status", "COMPLETED");

      setMyProducts(products || []);
      setMyPurchases(purchases || []);
    };

    if (user) fetchMyData();
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">판매 내역</TabsTrigger>
          <TabsTrigger value="purchases">구매 내역</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSold={product.status === "SOLD"}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="purchases">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myPurchases.map((order) => (
              <ProductCard
                key={order.product.id}
                product={order.product}
                isSold={true}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
