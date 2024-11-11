"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);
    };

    checkUser();
  }, [supabase, router]);

  // 이미지 파일 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // 이미지 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!userId) {
        toast({
          title: "오류",
          description: "로그인이 필요합니다.",
          variant: "destructive",
        });
        return;
      }

      let uploadedImageUrl = null;

      // 이미지 업로드 처리
      if (imageFile) {
        // 파일 크기 체크
        if (imageFile.size > 2 * 1024 * 1024) {
          // 2MB 제한
          toast({
            title: "오류",
            description: "파일 크기는 2MB 이하여야 합니다.",
            variant: "destructive",
          });
          return;
        }

        // 파일 타입 체크
        if (!imageFile.type.startsWith("image/")) {
          toast({
            title: "오류",
            description: "이미지 파일만 업로드 가능합니다.",
            variant: "destructive",
          });
          return;
        }

        try {
          const fileExt = imageFile.name.split(".").pop();
          const fileName = `${Date.now()}.${fileExt}`; // 더 안전한 파일명 생성
          const filePath = `${userId}/${fileName}`;

          // 업로드 전에 기존 파일이 있다면 삭제
          const { data: existingFiles, error: listError } =
            await supabase.storage.from("products").list(userId);

          // 리스트 조회 에러 처리
          if (listError) {
            console.error("Error listing files:", listError);
          } else if (existingFiles && existingFiles.length > 0) {
            // existingFiles가 null이 아니고 길이가 0보다 클 때만 삭제 실행
            try {
              await Promise.all(
                existingFiles.map((file) =>
                  supabase.storage
                    .from("products")
                    .remove([`${userId}/${file.name}`])
                )
              );
            } catch (deleteError) {
              console.error("Error deleting existing files:", deleteError);
              // 기존 파일 삭제 실패해도 새 파일 업로드는 계속 진행
            }
          }

          // 새 파일 업로드
          const { error: uploadError, data } = await supabase.storage
            .from("products")
            .upload(filePath, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            throw uploadError;
          }

          // 공개 URL 가져오기
          const {
            data: { publicUrl },
          } = supabase.storage.from("products").getPublicUrl(filePath);

          uploadedImageUrl = publicUrl;
        } catch (error: any) {
          console.error("Storage error:", error);
          toast({
            title: "이미지 업로드 실패",
            description:
              error.message || "이미지 업로드 중 오류가 발생했습니다.",
            variant: "destructive",
          });
          return;
        }
      }

      const form = e.target as HTMLFormElement;
      const data = {
        title: (form.querySelector("#title") as HTMLInputElement).value,
        price: Number((form.querySelector("#price") as HTMLInputElement).value),
        description: (form.querySelector("#description") as HTMLTextAreaElement)
          .value,
        imageUrl: uploadedImageUrl,
        seller: userId,
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      toast({
        title: "성공",
        description: "상품이 등록되었습니다.",
      });

      router.push("/");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "오류",
        description: error.message || "상품 등록에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>상품 등록하기</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                상품 이미지
              </label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-violet-100"
              />
              {imageUrl && (
                <div className="relative w-full h-48 mt-2">
                  <Image
                    src={imageUrl}
                    alt="Product preview"
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                제목
              </label>
              <Input
                id="title"
                name="title"
                required
                placeholder="상품 제목을 입력해주세요"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                가격
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                placeholder="가격을 입력해주세요"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                설명
              </label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="상품 설명을 입력해주세요"
                rows={5}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                취소
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
