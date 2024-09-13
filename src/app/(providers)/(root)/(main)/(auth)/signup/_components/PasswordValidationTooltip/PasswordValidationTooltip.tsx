"use client";

import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";

interface PasswordValidationTooltipProps {
  password: string;
  isVisible: boolean;
}

const PasswordValidationTooltip = ({
  password,
  isVisible,
}: PasswordValidationTooltipProps) => {
  if (!isVisible) return null;

  const isLengthValid = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  return (
    <div className="absolute mt-2 p-3 w-44 h-[130px] left-20 bg-white-100 border border-gray-200 rounded-lg shadow-lg z-10">
      <div className="absolute -top-2 left-16 w-4 h-4 rotate-45 bg-white-100 border-l border-t border-gray-200"></div>
      <p className="text-16-semibold font-medium mb-2">암호 필수 조건</p>
      <ul className="text-sm flex flex-col gap-2 ">
        <li
          className={`flex items-center ${
            isLengthValid ? "text-secondary-100" : "text-gray-600"
          }`}
        >
          {isLengthValid ? (
            <FaCircleCheck className="w-4 h-4 mr-1.5" />
          ) : (
            <FaRegCircleCheck className="w-4 h-4 mr-1.5" />
          )}
          <p>8자 이상</p>
        </li>
        <li
          className={`flex items-center ${
            hasSpecialChar ? "text-secondary-100" : "text-gray-600"
          }`}
        >
          {hasSpecialChar ? (
            <FaCircleCheck className="w-4 h-4 mr-1.5" />
          ) : (
            <FaRegCircleCheck className="w-4 h-4 mr-1.5" />
          )}
          특수문자
        </li>
        <li
          className={`flex items-center ${
            hasMixedCase ? "text-secondary-100" : "text-gray-600"
          }`}
        >
          {hasMixedCase ? (
            <FaCircleCheck className="w-4 h-4 mr-1.5" />
          ) : (
            <FaRegCircleCheck className="w-4 h-4 mr-1.5" />
          )}
          대소문자
        </li>
      </ul>
    </div>
  );
};

export default PasswordValidationTooltip;
