import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUT = `mutation($email: String!, $options: UsernamePasswordInput!) {
  register(email: $email, options: $options) {
    user {
      id
      email
    }
    errors {
      field
      message
    }
  }
}`;

const Register: React.FC<registerProps> = () => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          return register({
            email: values.email,
            options: {
              username: values.username,
              password: values.password,
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="Email" />
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              variant="outline"
              mt={4}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
