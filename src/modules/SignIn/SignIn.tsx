import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();

  const queryParams = useSearchParams();
  const params = queryParams.get("query");

  const validationSchema = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup.string().required("Password is required"),
  });
  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    console.log(values);
    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/signin`, values);

      console.log(response);
      const { token } = response.data;

      // Store the token in a cookie
      document.cookie = `token=${token}; Path=/`;

      // Redirect to a protected page or perform other actions

      toast({
        title: "Success.",
        description: "Login Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      setErrors({ password: "Invalid credentials" });
      toast({
        title: "Error.",
        description: "Invalid credentials",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setSubmitting(false);
  };

  return (
    <Flex
      minH={{ md: "100vh", base: "100vh" }}
      align={"center"}
      justify={"center"}
      bg="blue.500"
    >
      <Stack
        spacing={8}
        mx={"auto"}
        w={{ md: "40%", base: "unset" }}
        py={12}
        px={6}
      >
        <Stack align={"center"} color={"white"}>
          <Heading fontSize={"4xl"}>LOGO</Heading>
        </Stack>

        <Box bg={useColorModeValue("white", "gray.50")} p={4}>
          <Center>
            {" "}
            <Heading fontSize="3xl" fontWeight="medium" mt={8}>
              Sign In
            </Heading>
          </Center>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box marginBottom="2">
                  <Heading mb={2} fontWeight={"medium"} fontSize={"md"}>
                    Email
                  </Heading>
                  <Field
                    variant={"filled"}
                    as={Input}
                    type="text"
                    name="email"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="email" />
                  </Box>
                </Box>
                <Box marginBottom="2">
                  <Heading mt={4} mb={2} fontWeight={"medium"} fontSize={"md"}>
                    Password
                  </Heading>
                  <Field
                    variant={"filled"}
                    as={Input}
                    type="password"
                    name="password"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="password" />
                  </Box>
                </Box>
                <button
                  type="submit"
                  className={`mt-4 bg-blue-500 w-full hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
                    isSubmitting
                      ? "opacity-75 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner /> : "Login"}
                </button>
                <Stack>
                  <Text align={"center"}>
                    Dont have an account?{" "}
                    <Link
                      fontWeight={"bold"}
                      href="../auth/sign-up"
                      color={"blue.400"}
                    >
                      Sign up
                    </Link>
                  </Text>
                  {!params && (
                    <Box>
                      <Flex justify={"center"} align={"center"}>
                        OR
                      </Flex>

                      <Text align={"center"}>
                        <Link
                          fontWeight={"bold"}
                          href="../auth/sign-in?query=admin"
                          color={"blue.400"}
                        >
                          Forgotten Password?
                        </Link>
                      </Text>
                    </Box>
                  )}
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
