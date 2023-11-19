import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import * as Yup from "yup";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

function VerifyEmail() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [showResendComponent, setShowResendComponent] = useState(true);
  const [showEmailAlert, setShowEmailAlert] = useState(true);

  const [timerSeconds, setTimerSeconds] = useState(30);

  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    validationSchema: Yup.object().shape({
      pin: Yup.string()
        .length(6, "PIN must be exactly 6 digits")
        .matches(/^\d+$/, "PIN must contain only digits")
        .required("PIN is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const { pin } = values;
      axios
        .post(`${API_ENDPOINT}/auth/verify-otp`, {
          userId: id,
          uniqueString: pin,
        })
        .then((response) => {
          console.log(response);
          toast({
            title: response.data.status,
            description: response.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          router.push(`/auth/sign-in`);
        })
        .catch((error) => {
          toast({
            title: error.response.data.status,
            description: error.response.data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    },
  });

  // useEffect hook to manage the timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (showResendComponent) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  });

  // Logic for resending OTP after the timer expires
  useEffect(() => {
    if (showResendComponent && timerSeconds === 0) {
      setShowResendComponent(false);

      setShowEmailAlert(false);
      console.log(timerSeconds);
    }
  }, [showResendComponent, timerSeconds]);

  function EmailAlert() {
    return (
      <Alert status="success" bg={"teal.50"} rounded={"lg"}>
        <AlertIcon />
        <Box>
          <AlertTitle fontWeight={"semibold"}>
            We sent a one time password (OTP) to{" "}
            <Text as="span" fontWeight={"bold"}>
              ajy
            </Text>{" "}
            <Text fontWeight={"bold"} color={"teal.500"} as={"span"}>
              Change email?
            </Text>
          </AlertTitle>
          <AlertDescription>
            Please check your email and enter the code.
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
      <Stack spacing={8} mx={"auto"} mt={4} maxW={"lg"} py={12} px={6}>
        <Box>Header</Box>
        <Box
          rounded={"lg"}
          bg="white"
          boxShadow={"none"}
          w={{ md: "500px", base: "350px" }}
          p={{ md: 4, base: 4 }}
        >
          <Stack spacing={4}>
            {showEmailAlert ? <EmailAlert /> : ""}

            <form onSubmit={formik.handleSubmit} className="w-full ">
              <VStack spacing={8} align="flex-start">
                <Box width={"full"} textAlign={"center"}>
                  <FormControl
                    isInvalid={!!formik.touched.pin && !!formik.errors.pin}
                  >
                    <FormLabel textAlign={"center"} htmlFor="pin">
                      Enter Your PIN
                    </FormLabel>
                    <PinInput
                      id="pin"
                      value={formik.values.pin}
                      onChange={(value) => formik.setFieldValue("pin", value)}
                      onComplete={() => console.log("PIN input completed")}
                      autoFocus
                    >
                      <PinInputField m={2} />
                      <PinInputField m={2} />
                      <PinInputField m={2} />
                      <PinInputField m={2} />
                      <PinInputField m={2} />
                      <PinInputField m={2} />
                    </PinInput>
                    <FormErrorMessage textAlign={"center"}>
                      {formik.errors.pin}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </VStack>
              <Stack spacing={4} pt={4}>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded"
                >
                  {formik.isSubmitting ? (
                    <Spinner size={"sm"} color="white" />
                  ) : (
                    "confirm"
                  )}
                </button>
              </Stack>
            </form>

            {showResendComponent ? (
              <Stack mb={1}>
                <Text align={"center"}>
                  Canttt find the OTP?{" "}
                  <Link color={"teal.500"}>
                    Resend in <span>{` ${timerSeconds}s`}</span>
                  </Link>
                </Text>
              </Stack>
            ) : (
              <Stack mb={8}>
                <Text align={"center"}>
                  Cant find the OTP?{" "}
                  <Text
                    as={"span"}
                    //   onClick={showResendOtp}
                    cursor={"default"}
                    color={"teal.500"}
                  >
                    Resend OTP
                  </Text>
                </Text>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default VerifyEmail;
