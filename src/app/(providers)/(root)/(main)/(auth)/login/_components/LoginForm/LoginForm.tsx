"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { CgDanger } from "react-icons/cg";
import useLogin from "../../_hooks/useLogin";

export interface LogInFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

const LoginForm = () => {
  const {
    formData,
    showPassword,
    loginError,
    isLoading,
    handleChange,
    handleEmailSubmit,
    handleEmailKeyDown,
    handleEmailChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-1/2 flex flex-col items-center justify-center"
      >
        <h2 className="text-32-semibold mt-[100px] mb-[70px]">로그인</h2>
        <div className="flex flex-col w-[400px]">
          <Input
            label="이메일"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            onKeyDown={handleEmailKeyDown}
            status={loginError ? "error" : "default"}
            iconOnClick={handleEmailSubmit}
          />

          <div
            className={`w-full overflow-hidden mt-6 ${
              showPassword ? "animate-slideDownFadeIn" : "opacity-0"
            }`}
          >
            <Input
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              status={loginError ? "error" : "default"}
              onChange={handleChange}
            />
          </div>
          {loginError && (
            <div className="w-full ml-1 mt-2">
              <p className="text-danger-100 text-12-medium flex items-center gap-1">
                <CgDanger size={20} />
                {loginError}
              </p>
            </div>
          )}
        </div>

        <div
          className={`overflow-hidden flex justify-center w-[400px] mt-[60px] ${
            showPassword ? "animate-slideDownFadeIn" : "opacity-0"
          }`}
        >
          <Button
            type="submit"
            size={"lg"}
            width={"full"}
            disabled={!showPassword}
          >
            로그인
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-2 mt-[70px]">
        <p className="text-black-50">아직 회원이 아니신가요?</p>
        <Link
          href="/signup"
          className="text-secondary-100 border-b-2 border-secondary-100"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
