import { useState, useEffect } from "react";
import { Button } from "../../components/button";
import { Form } from "../../components/form";
import { FormField } from "../../components/form-field";
import { SubmitButton } from "../../components/submit-button";
import * as validations from "../../utils/validators";
import "./style.css";

type TSignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialValues: TSignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [user, setUser] = useState<TSignupData | null>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (user) {
      setOpen(true);
    }
  }, [user]);
  return (
    <div className="wrapper">
      <div className="left">
        <h1 className="title">Learn to code by watching others</h1>
        <p className="lead">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
      <div className="right">
        <p className="promo">
          Try it free 7 days <span>then $20/mo. thereafter</span>
        </p>
        <Form<TSignupData>
          onSubmit={(values) => {
            setUser(values);
          }}
          validationMode="all"
          initialValues={initialValues}
          validations={{
            firstName: [validations.isRequired("First Name cannot be empty")],
            lastName: [validations.isRequired("Last Name cannot be empty")],
            email: [
              validations.isRequired("Email cannot be empty"),
              validations.isEmail("Looks like this is not an email"),
            ],
            password: [validations.isRequired("Password cannot be empty")],
          }}
        >
          <div className="signup-form">
            <FormField name="firstName" placeholder="First Name" />
            <FormField name="lastName" placeholder="Last Name" />
            <FormField name="email" placeholder="Email Address" />
            <FormField name="password" placeholder="Password" type="password" />
            <SubmitButton label="Claim your free trial" />
            <p>
              By clicking the button, you are agreeing to our{" "}
              <a href="#">Terms and Services</a>
            </p>
          </div>
        </Form>
      </div>
      {open && (
        <div className="popup">
          <p>
            Signup successfully as{" "}
            <span>
              {user?.firstName} {user?.lastName}
            </span>
            .
          </p>
          <Button
            primary
            variant="outlined"
            label="close"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Signup;
