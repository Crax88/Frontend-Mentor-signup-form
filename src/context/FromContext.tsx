import { createContext, useContext } from "react";
import { TError } from "../types";

type TFormContext = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors: TError;
  values: {
    [key: string]: any;
  };
  touched: {
    [key: string]: boolean;
  };
};

const FormContext = createContext<TFormContext>({} as TFormContext);

export const FormContextProvider = FormContext.Provider;

export const useFormContext = () => {
  return useContext(FormContext);
};
