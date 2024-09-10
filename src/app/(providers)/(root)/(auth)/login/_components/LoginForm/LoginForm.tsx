"use client";

import Input from "@/components/Input";
import { useState } from "react";
import useLoginForm from "../../_hooks/useLoginForm";

export interface LogInFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

const LoginForm = () => {
  const { formData, setFormData, errors, handleChange, setErrors } =
    useLoginForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.email) {
      setShowPassword(true);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setLoginError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 h-1/2 flex flex-col items-center justify-center border border-black"
    >
      <Input
        label="이메일"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleEmailChange}
        iconOnClick={handleEmailSubmit}
      />

      <div
        className={`w-full mt-4 overflow-hidden ${
          showPassword ? "animate-slideDownFadeIn" : "animate-slideUpFadeOut"
        }`}
      >
        <Input
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
        />
      </div>
      {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
      <div
        className={`w-full mt-4 overflow-hidden ${
          showPassword ? "animate-slideDownFadeIn" : "animate-slideUpFadeOut"
        }`}
      >
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
