"use client";

import React from "react";
import { ButtonComponent } from "../types";

/**
 * Button component renders a button with a label and an optional onClick handler.
 * */

const Button: React.FC<ButtonComponent> = ({
  label,
  onClick,
}: ButtonComponent): JSX.Element => {
  const colorStyle =
    label === "+ Add new link"
      ? "bg-white text-dark-purple border border-dark-purple hover:bg-lightest-purple"
      : "bg-dark-purple text-white hover:bg-light-purple ";

  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${colorStyle} duration-500 ease-in-out font-semibold rounded-lg w-full h-[46px]`}
    >
      {label}
    </button>
  );
};

export default Button;
