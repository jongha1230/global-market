"use client";

import Input from "@/components/Input";
import useLoginForm from "../../_hooks/useLoginForm";

export interface LogInFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

const LoginForm = () => {
  const { formData, setFormData, errors, handleChange, setErrors } =
    useLoginForm();

  return (
    <div className="w-1/3 h-1/2 grid place-items-center border border-black">
      <Input
        label="아이디"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input className="border border-black px-2 h-10" type="password" />
      <input className="border border-black px-2 h-10" type="text" />
      <input className="border border-black px-2 h-10" type="text" />
    </div>
  );
};

export default LoginForm;
