import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
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
