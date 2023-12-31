import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import * as yup from "yup";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export interface initialValuesProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUp = () => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const router = useRouter();
  const toast = useToast();

  const queryParams = useSearchParams();
  const params = queryParams.get("query");

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().required("email is required"),
    password: yup.string().min(8).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const handleSubmit = async (values: initialValuesProps) => {
    axios
      .post(`${API_ENDPOINT}/auth/signup`, {
        name: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        setIsSubmit(false);
        toast({
          title: response.data.status,
          description: response.data.message,
          status: "success",
          duration: 900,
          isClosable: true,
        });
        const id = response.data.data.userId;

        router.push(`/auth/verify-email?id=${id}`);
      })
      .catch((error) => {
        setIsSubmit(false);
        toast({
          title: error.response.data.status,
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      minH={{ md: "100vh", base: "100vh" }}
      align={"center"}
      justify={"center"}
      // bg="blue.500"
      bg="gray.50"
    >
      <Stack
        spacing={8}
        mx={"auto"}
        w={{ md: "40%", base: "unset" }}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"2xl"}>Sign Up</Heading>
        </Stack>

        <Box borderRadius={"lg"} bg="white" p={4} color={"black"}>
          <Center>
            {" "}
            {/* <Heading fontSize="2xl" fontWeight="medium" mt={6} mb={8}>
              Sign up
            </Heading> */}
          </Center>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box marginBottom="2" mx={{ md: 12 }}>
                  <Heading mb={2} fontWeight={"medium"} fontSize={"sm"}>
                    Email
                  </Heading>
                  <Field
                    // colorScheme={"teal"}
                    // variant={"flushed"}
                    as={Input}
                    type="text"
                    name="email"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="email" />
                  </Box>
                </Box>

                <Box marginBottom="2" mx={{ md: 12 }}>
                  <Heading mb={2} fontWeight={"medium"} fontSize={"sm"}>
                    Username
                  </Heading>
                  <Field
                    // variant={"filled"}
                    as={Input}
                    type="text"
                    name="username"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="username" />
                  </Box>
                </Box>

                <Box marginBottom="2" mx={{ md: 12 }}>
                  <Heading mb={2} fontWeight={"medium"} fontSize={"sm"}>
                    Password
                  </Heading>
                  <Field
                    // variant={"filled"}
                    as={Input}
                    type="password"
                    name="password"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="password" />
                  </Box>
                </Box>

                <Box marginBottom="2" mx={{ md: 12 }}>
                  <Heading mb={2} fontWeight={"medium"} fontSize={"sm"}>
                    Confirm Password
                  </Heading>
                  <Field
                    // variant={"filled"}
                    as={Input}
                    type="password"
                    name="confirmPassword"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="confirmPassword" />
                  </Box>
                </Box>

                <Box mx={{ md: 12 }}>
                  <button
                    onClick={() => setIsSubmit(true)}
                    type="submit"
                    className={`mt-4 bg-blue-500 w-full hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                      isSubmitting
                        ? "opacity-75 cursor-not-allowed"
                        : "opacity-100 cursor-pointer"
                    }`}
                    disabled={isSubmitting}
                  >
                    {/* {isSubmitting ? (
                    <Spinner size={"sm"} color="white" />
                  ) : (
                    "Login"
                  )} */}
                    {"Sign Up"}
                  </button>
                </Box>
                <Stack mt={4} fontSize={"small"}>
                  <Text align={"center"}>
                    Already have an account?{" "}
                    <Link
                      fontWeight={"bold"}
                      href="../auth/sign-in"
                      color={"blue.500"}
                    >
                      Sign in
                    </Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
