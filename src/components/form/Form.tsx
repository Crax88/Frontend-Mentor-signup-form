import { useCallback, useState, useRef, useEffect, ReactNode } from "react";
import { FormContextProvider } from "../../context/FromContext";
import { ObjectType, TValidationFn, TError } from "../../types";

type TValidations<T> = {
  [k in keyof T]: TValidationFn[];
};

type TProps<T> = {
  children: ReactNode;
  validationMode: "all" | "blur" | "change" | "onSubmit";
  validations?: TValidations<T>;
  onSubmit: (values: T) => void;
  initialValues: T;
};

const makeDefaultErrors = <T extends ObjectType>(values: T): TError => {
  const errors = {} as TError;
  for (let key in values) {
    errors[key] = [];
  }
  return errors;
};

const Form = <T extends ObjectType>({
  children,
  validationMode,
  validations,
  initialValues,
  onSubmit,
}: TProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<TError>(makeDefaultErrors(values));
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isFormValid, setIsFormValid] = useState(true);
  const validationsRef = useRef<TValidations<T> | undefined>(validations);

  const validate = useCallback(
    (validations: TValidationFn[], field: string, value: string) => {
      setErrors((prev) => ({
        ...prev,
        [field]: validations
          .map((errorsFor) => errorsFor(value))
          .filter((errorMsg) => errorMsg.length > 0),
      }));
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      if (
        ["all", "change"].includes(validationMode) &&
        validationsRef.current &&
        validationsRef.current[e.target.name]
      ) {
        validate(
          validationsRef.current[e.target.name],
          e.target.name,
          e.target.value
        );
      }
    },
    [validate, validationMode]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (
        ["all", "blur"].includes(validationMode) &&
        validationsRef.current &&
        validationsRef.current[e.target.name]
      ) {
        validate(
          validationsRef.current[e.target.name],
          e.target.name,
          e.target.value
        );
      }
    },
    [validate, validationMode]
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors((prev) => ({ ...prev, [e.target.name]: [] }));
  }, []);

  const reset = () => {
    setValues(initialValues);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (["all", "submit"].includes(validationMode) && validationsRef.current) {
      const submitErrors: TError = {};
      const toSetTouched: { [key: string]: boolean } = {};
      const validationResult = Object.entries(values)
        .map(([key, value]) => {
          if (!validationsRef.current![key]) {
            return [];
          } else {
            const keyRes = validationsRef
              .current![key].map((errorsFor) => errorsFor(value.toString()))
              .filter((errorsMsg) => errorsMsg.length > 0);
            if (keyRes.length) {
              submitErrors[key] = keyRes;
              toSetTouched[key] = true;
            }
            return keyRes;
          }
        })
        .filter((errorMsg) => errorMsg.length > 0);

      if (!validationResult.length) {
        onSubmit(values);
        reset();
      } else {
        setErrors(submitErrors);
        setTouched(toSetTouched);
      }
    } else {
      onSubmit(values);
      reset();
    }
  };

  // useEffect(() => {
  //   if (Object.values(errors).find((el) => el.length > 0)) {
  //     setIsFormValid(false);
  //   } else {
  //     setIsFormValid(true);
  //   }
  // }, [errors]);

  return (
    <FormContextProvider
      value={{
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        errors,
        values,
        touched,
      }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContextProvider>
  );
};

export default Form;
