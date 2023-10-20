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
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const SignUp = () => {
  const router = useRouter();
  const toast = useToast();

  const queryParams = useSearchParams();
  const params = queryParams.get("query");

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
  });
  const handleSubmit = async () => {};

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
              Sign up
            </Heading>
          </Center>
          <Formik
            initialValues={{ username: "", password: "" }}
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
                    name="username"
                  />
                  <Box mt={2} color="red.500" fontSize="sm">
                    <ErrorMessage name="username" />
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
                <Stack mt={4}>
                  <Text align={"center"}>
                    Already have an account?{" "}
                    <Link
                      fontWeight={"bold"}
                      href="../auth/sign-up"
                      color={"blue.400"}
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
