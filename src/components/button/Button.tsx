import React, { ButtonHTMLAttributes } from "react";
import "./style.css";

type TProps = {
  label: string;
  disabled?: boolean;
  variant?: "contained" | "outlined";
  primary?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  label,
  onClick,
  disabled,
  type = "button",
  primary,
  variant,
}: TProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${primary ? "primary" : ""} ${
        !variant ? "" : variant === "contained" ? "contained" : "outlined"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
