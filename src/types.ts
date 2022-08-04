export type TError = {
  [key: string]: string[];
};

export type TValidationFn = (val: string) => string;

export type ObjectType = {
  [key: string]: string | number;
};