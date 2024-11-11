"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth.store";
import { createClient } from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          // 사용자 정보 가져오기 (nickname 등 추가 정보가 필요한 경우)
          const { data: profile, error: profileError } = await supabase
            .from("profiles") // 프로필 테이블명에 맞게 수정
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) throw profileError;

          setUser({
            id: session.user.id,
            email: session.user.email!,
            nickname: profile?.nickname || null,
            address: profile?.address || null,
          });
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkSession();

    // 세션 변경 이벤트 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // 사용자 정보 가져오기
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!profileError) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            nickname: profile?.nickname || null,
            address: profile?.address || null,
          });
        }
      } else {
        setUser(null);
      }
    });

    // 클린업 함수
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "로그아웃",
        description: "로그아웃되었습니다.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "오류",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="flex flex-col w-full">
      {/* 로고, 회원가입/로그인 */}
      <div className="flex items-center justify-between w-full px-3 py-4">
        <Link href={"/"}>
          <h1 className="text-32-semibold">종하마켓</h1>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-primary-100">
                {user.nickname || user.email}님
              </span>
              <div className="w-px h-4 bg-black-100" aria-hidden="true" />
              <Button
                variant="ghost"
                className="text-black-100 hover:text-primary-100"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
              <div className="w-px h-4 bg-black-100" aria-hidden="true" />
              <Link href="/my-page">
                <Button
                  variant="ghost"
                  className="text-black-100 hover:text-primary-100"
                >
                  마이페이지
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/signup"}>
                <span className="text-primary-100">회원가입</span>
              </Link>
              <div className="w-px h-4 bg-black-100" aria-hidden="true" />
              <Link href={"/login"}>
                <span>로그인</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 카테고리 */}
      <div className="flex items-center justify-between px-4 pb-4">
        <button className="text-16-medium flex items-center gap-1">
          <GiHamburgerMenu size={24} />
          <span>카테고리</span>
        </button>
        {user && (
          <Link href="/products/new">
            <Button variant="default" className="bg-primary-100">
              상품 등록
            </Button>
          </Link>
        )}
      </div>

      {/* 구분자 */}
      <div className="w-full h-px bg-[#ccc]" />
    </header>
  );
};

export default Header;
