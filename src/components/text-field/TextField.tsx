import React, { useState, useRef, memo, HTMLInputTypeAttribute } from "react";
import "./style.css";

export type TValidationFn = (val: string) => string;

type TProps = {
  value: string;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const TextField = ({
  name,
  value,
  label,
  type = "text",
  error = true,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}: TProps) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const hadleLabelClick = () => {
    ref.current?.focus();
  };

  return (
    <div
      className={`field ${focused ? "is-focused" : ""} ${
        value.length > 0 ? "has-value" : ""
      } ${error ? "has-error" : ""}`}
    >
      {label && <label onClick={hadleLabelClick}>{label}</label>}
      <input
        placeholder={placeholder}
        name={name}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
    // </div>
  );
};

export default memo(TextField);
