"use client";

import React, { useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { PiCheckBold } from "react-icons/pi";

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  label?: string;
  id?: string;
  status?: "default" | "error" | "success";
  iconOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Input = ({
  type = "text",
  label = "",
  name = "",
  value,
  onChange,
  id,
  status = "default",
  iconOnClick,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const borderColor = isFocused ? "border-accent-100" : "border-black-50";
  const labelClass =
    isFocused || value !== ""
      ? "top-2 -translate-y-1 text-12-medium"
      : "top-1/2 -translate-y-1/2 text-16-medium";

  const iconClass =
    isFocused || value !== ""
      ? "top-2 translate-y-4 "
      : "top-1/2 -translate-y-1/2";

  const Icon = status === "success" ? PiCheckBold : IoArrowForwardCircleOutline;

  return (
    <div className="relative mt-6 w-full">
      <label
        htmlFor={id}
        className={`absolute left-4 text-black-50 pointer-events-none transition-all duration-300 ${labelClass}`}
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
        className={`peer w-full pl-4 pr-10 pt-5 pb-1 text-16 border-2 ${borderColor} rounded focus:ring-1 focus:outline-none placeholder-transparent`}
        placeholder={label}
      />
      {iconOnClick && (
        <button
          type="button"
          onClick={iconOnClick}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-300 ${iconClass}`}
        >
          <Icon size={20} />
        </button>
      )}
    </div>
  );
};

export default Input;
