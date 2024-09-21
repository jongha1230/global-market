"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import useSignUp from "../../_hooks/useSignUp";
import AddressSearch from "../AddressSearch/AddressSearch";
import PasswordValidationTooltip from "../PasswordValidationTooltip";

const SignUpForm = () => {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleAddressComplete,
  } = useSignUp();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-1/2 flex flex-col items-center justify-center"
      >
        <h2 className="text-32-semibold mt-[100px] mb-[70px]">회원가입</h2>
        <div className="flex flex-col w-[400px] gap-5">
          <Input
            label="이메일"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            status={errors.email ? "error" : "default"}
            error={errors.email}
          />
          <div className="relative">
            <Input
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              status={errors.password ? "error" : "default"}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <PasswordValidationTooltip
              password={formData.password}
              isVisible={isPasswordFocused}
            />
          </div>
          <Input
            label="비밀번호 확인"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            status={errors.confirmPassword ? "error" : "default"}
            error={errors.confirmPassword}
          />
          <Input
            label="이름"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            status={errors.nickname ? "error" : "default"}
            error={errors.nickname}
          />
          <AddressSearch onComplete={handleAddressComplete} />
          <Input
            label="우편번호"
            id="zonecode"
            name="zonecode"
            value={formData.zonecode}
            readOnly
            status={errors.zonecode ? "error" : "default"}
            error={errors.zonecode}
          />
          <Input
            label="주소"
            id="address"
            name="address"
            value={formData.address}
            readOnly
            status={errors.address ? "error" : "default"}
            error={errors.address}
          />
          <Input
            label="상세주소"
            id="detailAddress"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleChange}
            status={errors.detailAddress ? "error" : "default"}
            error={errors.detailAddress}
          />
        </div>
        {errors.form && <p className="text-red-500 mt-2">{errors.form}</p>}
        <div className="overflow-hidden flex justify-center w-[400px] mt-[60px]">
          <Button type="submit" size="lg" width="full" disabled={isLoading}>
            {isLoading ? "처리 중..." : "회원가입"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
