import ErrorMessage from "../error-message/ErrorMessage";
import { useFormContext } from "../../context/FromContext";
import { TextField } from "../text-field";
import "./style.css";
import { HTMLInputTypeAttribute } from "react";

type TProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

const FormTextField = ({ name, label, placeholder, type }: TProps) => {
  const { values, errors, touched, onChange, onBlur, onFocus } =
    useFormContext();

  return (
    <div className="form-field">
      <TextField
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={values[name]}
        label={label}
        onBlur={onBlur}
        onFocus={onFocus}
        error={touched[name] && Boolean(errors[name].length)}
      />

      {touched[name] && errors[name] && (
        <ErrorMessage message={errors[name][0]} />
      )}
    </div>
  );
};

export default FormTextField;
