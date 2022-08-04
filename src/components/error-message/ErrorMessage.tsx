import "./style.css";

type TProps = {
  message: string;
};

const ErrorMessage = ({ message }: TProps) => {
  return <small className="error-message">{message}</small>;
};

export default ErrorMessage;
