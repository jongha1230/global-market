"use client";

import { useState } from "react";

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  zonecode: string;
  detailAddress: string;
}
interface FormErrors
  extends Partial<Record<keyof SignUpFormData, string | null>> {
  form?: string | null;
}

const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    address: "",
    zonecode: "",
    detailAddress: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    const validateEmail = (email: string) => {
      return !email.includes("@") ? "유효한 이메일 주소를 입력해주세요." : null;
    };

    let error = null;
    if (name === "email") {
      error = validateEmail(value);
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return { formData, setFormData, errors, handleChange, setErrors };
};

export default useSignUpForm;
