"use client";

import { ButtonComponent } from "@/@core/types";
import React from "react";

/**
 * Button component renders a button with a label and an optional onClick handler.
 * */

const Button: React.FC<ButtonComponent> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
}: ButtonComponent): JSX.Element => {
  const colorStyle = disabled
    ? "bg-white text-medium-gray border border-medium-gray"
    : label === "+ Add new link"
    ? "bg-white text-dark-purple border border-dark-purple hover:bg-lightest-purple"
    : "bg-dark-purple text-white hover:bg-light-purple ";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${colorStyle} duration-500 ease-in-out font-semibold rounded-lg w-full h-[46px]`}
    >
      {label}
    </button>
  );
};

export default Button;
