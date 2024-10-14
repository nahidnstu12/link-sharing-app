"use client";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CustomsInputProps } from "../types";

/**
 * Renders an input field that works with React Hook Form and Yup validation.
 */

const Input: React.FC<CustomsInputProps> = ({
  name,
  type,
  label,
  placeholder,
  autoComplete,
  iconSrc,
}: CustomsInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string; // Error message if validation fails
  const errorId = `error-${name}`;
  const haveIcon = Boolean(iconSrc);
  const inputClasses = `w-full border bg-white placeholder:text-medium-gray ${
    haveIcon ? "pl-10" : "pl-5"
  } h-12 rounded-lg focus:outline-none ${
    error
      ? "border-error-border text-medium-red"
      : "border-input-border text-dark-gray"
  } focus:border-focus-border`;

  return (
    <>
      <label
        htmlFor={name}
        className={` ${
          error && label !== "Link" ? "text-medium-red" : "text-dark-gray"
        } ${!haveIcon ? "w-[120px] text-base text-medium-gray " : "text-xs"}`}
      >
        {label}
      </label>
      <div className="relative w-full">
        {haveIcon && (
          <Image
            src={iconSrc!}
            alt={`${name} icon`}
            width={16}
            height={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        )}
        <input
          className={inputClasses}
          type={type}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <p id={errorId} className={`text-medium-red`}>
          {error}
        </p>
      )}
    </>
  );
};

export default Input;
