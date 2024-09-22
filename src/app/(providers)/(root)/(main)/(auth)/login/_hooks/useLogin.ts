"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export interface LoginFormData {
  email: string;
  password: string;
}

const useLogin = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => axios.post("/api/auth/login", data),
    onSuccess: (response) => {
      console.log("로그인 성공:", response.data);
      setUser({
        id: response.data.id,
        email: response.data.email,
        nickname: response.data.nickname,
        address: response.data.address,
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setLoginError(error.response.data.error || "로그인에 실패했습니다.");
      } else {
        setLoginError("로그인 중 오류가 발생했습니다.");
      }
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
    if (formData.email) {
      setShowPassword(true);
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formData.email) {
        setShowPassword(true);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (showPassword) {
      setShowPassword(false);
      setFormData((prev) => ({ ...prev, password: "" }));
    }
    setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoginError("이메일과 비밀번호를 모두 입력해주세요.");
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
