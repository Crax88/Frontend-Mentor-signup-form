import { Button } from "../button";

type TProps = {
  label: string;
};

const SubmitButton = ({ label }: TProps) => {
  return (
    <Button
      label={label}
      onClick={() => {}}
      type="submit"
      variant="contained"
      primary
    />
  );
};

export default SubmitButton;
