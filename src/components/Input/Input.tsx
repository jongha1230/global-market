"use client";

import React, { FocusEvent, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { PiCheckBold } from "react-icons/pi";

export interface InputProps {
  value: string;
  type?: string;
  name?: string;
  label?: string;
  id?: string;
  status?: "default" | "error" | "success";
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  label = "",
  name = "",
  value,
  onChange,
  id,
  status = "default",
  readOnly,
  iconOnClick,
  onKeyDown,
  onFocus,
  onBlur,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const borderColor =
    status === "error"
      ? "border-danger-80"
      : isFocused
      ? "border-accent-100"
      : "border-black-50";

  const bgColor = status === "error" ? "bg-danger-20" : "bg-white";

  const labelColor = status === "error" ? "placeholder-danger-80" : "";

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
    <div className="relative w-full">
      <label
        htmlFor={id}
        className={`absolute left-4 text-black-50 pointer-events-none transition-all duration-300 ${labelColor} ${labelClass}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        className={`peer w-full pl-4 pr-10 pt-5 pb-1 text-16 border-2 ${borderColor} ${bgColor} rounded-lg focus:ring-1 focus:outline-none placeholder-transparent`}
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
