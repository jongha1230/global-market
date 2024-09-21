import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  zonecode: string;
  address: string;
  detailAddress: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  fullAddress: string;
}

interface FormErrors
  extends Partial<Record<keyof SignUpFormData, string | null>> {
  form?: string | null;
}

const useSignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    zonecode: "",
    address: "",
    detailAddress: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: keyof SignUpFormData, value: string) => {
    let error: string | null = null;
    switch (name) {
      case "email":
        error = !value.includes("@")
          ? "유효한 이메일 주소를 입력해주세요."
          : null;
        break;
      case "password":
        if (value.length < 8) {
          error = "비밀번호는 8자 이상이어야 합니다.";
        } else {
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          const hasMixedCase = /[a-z]/.test(value) && /[A-Z]/.test(value);
          if (!hasSpecialChar || !hasMixedCase) {
            error = "비밀번호는 특수문자와 대소문자를 모두 포함해야 합니다.";
          }
        }
        break;

      case "confirmPassword":
        error =
          value !== formData.password ? "비밀번호가 일치하지 않습니다." : null;
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof SignUpFormData;
      validateField(fieldName, formData[fieldName]);
      if (errors[fieldName]) isValid = false;
    });
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof SignUpFormData, value);
  };

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpPayload) => axios.post("/api/auth/signup", data),
    onSuccess: (response) => {
      console.log("회원가입 성공:", response.data);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setErrors((prev) => ({
          ...prev,
          form: error.response?.data.error || "회원가입에 실패했습니다.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "회원가입 중 오류가 발생했습니다.",
        }));
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const fullAddress =
      `${formData.zonecode} ${formData.address} ${formData.detailAddress}`.trim();

    signUpMutation.mutate({
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      fullAddress,
    });
  };

  const handleAddressComplete = (data: {
    zonecode: string;
    address: string;
    extraAddress: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      zonecode: data.zonecode,
      address: `${data.address} ${data.extraAddress}`.trim(),
    }));
  };

  return {
    formData,
    setFormData,
    errors,
    handleChange,
    handleSubmit,
    handleAddressComplete,
    isLoading: signUpMutation.isPending,
  };
};

export default useSignUp;
