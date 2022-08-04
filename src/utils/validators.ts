export const isRequired = (message: string = 'Field is required') => (value: string) => {
  return value.length > 0 ? "" : message;
};

export const isEmail = (message: string = "Ivalid email format") => (value: string) => {
  const ai = value.indexOf("@");
  const gdi = value.split("").reduce((acc, char, i) => {
    return char === "." ? i : acc;
  }, 0);
  return ai > -1 && gdi > ai ? "" : message;
};

export const hasCapilalLetter = (message: string = "One uppercase letter") => (value: string) => {
  return value && /[A-Z]/.test(value) ? "" : message;
};
export const hasLowerLetter =(message: string = "One lowercase letter") => (value: string) => {
  return value && /[a-z]/.test(value) ? "" : message;
};
export const hasDigit = (message: string = "One digit") => (value: string) => {
  return value && /[0-9]/.test(value) ? "" : message;
};

export const minLength =  (length: number) => (value: string) => {
  return value && value.length < length ? `Min length ${length}` : "";
};

export const hasSpecialChar = (chars: string) => (value: string) => {
  if (!value) {
    return "";
  }
  let match = false;
  for (let char of value) {
    if (chars.indexOf(char) !== -1) {
      match = true;
    }
  }
  return match ? "" : `One special character ${chars}`;
}