"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import useSignUpForm from "../../../login/_hooks/useLoginForm";
import AddressSearch from "../AddressSearch/AddressSearch";
import PasswordValidationTooltip from "../PasswordValidationTooltip";

interface AddressData {
  zonecode: string;
  address: string;
}

const SignUpForm = () => {
  const { formData, setFormData, errors, handleChange, setErrors } =
    useSignUpForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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

  const handleAddressComplete = (data: AddressData) => {
    setFormData((prev) => ({
      ...prev,
      zonecode: data.zonecode,
      address: data.address,
      detailAddress: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullAddress =
      formData.address && formData.detailAddress
        ? `${formData.address}, ${formData.detailAddress}`
        : formData.address;
    console.log({ ...formData, fullAddress });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-1/2 flex flex-col items-center justify-center"
      >
        <h2 className="text-32-semibold mb-[70px]">회원가입</h2>
        <div className="flex flex-col w-[400px] gap-5">
          <Input
            label="name@example.com"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            status={loginError ? "error" : "default"}
          />

          <div className="relative">
            <Input
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              status={loginError ? "error" : "default"}
              onChange={handlePasswordChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <PasswordValidationTooltip
              password={formData.password}
              isVisible={isPasswordFocused}
            />
          </div>

          <Input
            label="비밀번호확인"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            status={loginError ? "error" : "default"}
            onChange={handleChange}
          />

          <Input
            label="이름"
            id="nickname"
            name="nickname"
            type="nickname"
            value={formData.nickname}
            status={loginError ? "error" : "default"}
            onChange={handleChange}
          />

          <AddressSearch onComplete={handleAddressComplete} />

          {formData.zonecode && (
            <>
              <Input
                label="우편번호"
                id="zonecode"
                name="zonecode"
                value={formData.zonecode || ""}
                readOnly
              />

              <Input
                label="주소"
                id="address"
                name="address"
                value={formData.address || ""}
                readOnly
              />

              <Input
                label="상세 주소"
                id="detailAddress"
                name="detailAddress"
                value={formData.detailAddress || ""}
                onChange={handleChange}
              />
            </>
          )}
        </div>

        <div
          className={`overflow-hidden flex justify-center w-[400px] mt-[60px]`}
        >
          <Button type="submit" size={"lg"} width={"full"}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
