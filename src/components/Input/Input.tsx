"use client";

import React, { useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  label?: string;
  id?: string;
  status?: "default" | "error" | "success";
}

const Input = ({
  type = "text",
  label = "",
  name = "",
  value,
  onChange,
  id,
  status = "default",
}: InputProps) => {
  const [inputState, setInputState] = useState<"default" | "focus" | "typing">(
    "default"
  );

  const handleFocus = () => {
    setInputState("focus");
  };

  const handleBlur = () => {
    setInputState(value ? "typing" : "default");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setInputState(e.target.value ? "typing" : "focus");
  };

  const borderColor =
    inputState === "focus" || inputState === "typing"
      ? "border-accent-100"
      : "border-black";

  return (
    <div className="relative mt-6 w-full">
      <label
        htmlFor={id}
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300 ${
          inputState === "focus" || inputState === "typing"
            ? "top-0 -translate-y-0 text-xs text-primary-100"
            : ""
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`peer w-full px-3 py-3 text- border ${borderColor} rounded focus:outline-none focus:ring-1 focus:ring-accent-100 text-gray-900 placeholder-transparent`}
        placeholder={label}
      />
      <IoArrowForwardCircleOutline
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={24}
      />
    </div>
  );
};

export default Input;
