"use client";

import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface LoginFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    keepLoggedIn: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const setUser = useAuthStore((state) => state.setUser);

  // 이메일 유효성 검사 함수 추가
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => axios.post("/api/auth/login", data),
    onSuccess: (response) => {
      const { id, email, nickname, address } = response.data;

      // 필수 데이터 확인
      if (!id || !email) {
        throw new Error("Invalid user data received");
      }

      setUser({ id, email, nickname, address });

      toast({
        title: "로그인 성공",
        description: `${nickname || email}님 환영합니다!`,
      });

      router.push("/");
      router.refresh(); // 페이지 데이터 갱신
    },
    onError: (error) => {
      let errorMessage = "로그인 중 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
      }

      setLoginError(errorMessage);
      toast({
        title: "로그인 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLoginError(null);
  };

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.email) {
      setLoginError("이메일을 입력해주세요.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setLoginError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    setShowPassword(true);
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!formData.email) {
        setLoginError("이메일을 입력해주세요.");
        return;
      }

      if (!isValidEmail(formData.email)) {
        setLoginError("올바른 이메일 형식이 아닙니다.");
        return;
      }

      setShowPassword(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (showPassword) {
      setShowPassword(false);
      setFormData((prev) => ({ ...prev, password: "", keepLoggedIn: false }));
    }
    setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      const errorMessage = !formData.email
        ? "이메일을 입력해주세요."
        : "비밀번호를 입력해주세요.";

      setLoginError(errorMessage);
      toast({
        title: "입력 오류",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      const errorMessage = "올바른 이메일 형식이 아닙니다.";
      setLoginError(errorMessage);
      toast({
        title: "입력 오류",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    loginMutation.mutate(formData);
  };

  return {
    formData,
    showPassword,
    loginError,
    isLoading: loginMutation.isPending,
    handleChange,
    handleEmailSubmit,
    handleEmailKeyDown,
    handleEmailChange,
    handleSubmit,
  };
};

export default useLogin;
