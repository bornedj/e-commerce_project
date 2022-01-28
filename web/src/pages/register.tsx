import React from "react";
import { Form, Formik } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  console.log("at register");
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
            />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
