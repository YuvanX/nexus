"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Loader } from "./spinner";
import { AnimatePresence, motion } from "motion/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailAddressId, setEmailAddressId] = useState<string>("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(false);
  const [resendCountDown, setResetCountDown] = useState(0);
  const { isLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const id = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(id);
    }
  }, [error]);

  useEffect(() => {
    if(success) {
      const timer = setTimeout(() => setSuccess(null), 2000);
      return () => clearTimeout(timer)
    }
  }, [success])

  if (!isLoaded) return <Loader />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signIn?.create({ identifier: email, strategy: "email_code" });

      const factor = signIn?.supportedFirstFactors?.find(
        (f) => f.strategy === "email_code"
      );
      if (factor && "emailAddressId" in factor) {
        setEmailAddressId(factor.emailAddressId);
      }

      setPendingVerification(true);
      setSuccess("OTP send successfully");
    } catch (error: any) {
      if (error.errors[0].code === "form_identifier_not_found") {
        await signUp?.create({ emailAddress: email });
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // const primaryEmail = signUp?.emailAddresses?.[0];
        // if (primaryEmail.id) {
        //   setEmailAddressId(primaryEmail.id);
        // }

        setPendingVerification(true);
        setSuccess("OTP send successfully");
      } else if (error.errors[0].code === "form_param_format_invalid") {
        setError("Invalid Email format. Please enter a valid one.");
        return;
      } else {
        setError("Something went wrong. Please try again later");
        return;
      }
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (signIn?.status === "needs_first_factor") {
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: verificationCode,
        });

        await setSignInActive!({ session: result.createdSessionId });
        router.push("/dashboard");
      } else if (signUp?.status === "missing_requirements") {
        const result = await signUp.attemptEmailAddressVerification({
          code: verificationCode,
        });

        await setSignUpActive!({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.errors[0].code === "form_code_incorrect") {
        setError("Invalid OTP entered. Please enter correct OTP");
        return;
      } else if (error.errors[0] === "form_param_invalid_length") {
        setError("Invalid OTP length. OTP is 6-digit code");
        return;
      } else {
        setError("Something went wrong. Please try again later!");
      }
    }
  }

  async function handleResendCode(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (signIn?.status === "needs_first_factor") {
        const res = await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: emailAddressId,
        });

        if (res.status === "complete") {
          setSuccess("OTP sent successfully");
        }
      } else if (signUp?.status === "missing_requirements") {
        const res = await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        if (res.status === "complete") {
          setSuccess("OTP sent successfully");
        }
      }

      setResendTimer(true);
      setResetCountDown(30);

      const interval = setInterval(() => {
        setResetCountDown((prev) => {
          if (prev == 1) {
            clearInterval(interval);
            setResendTimer(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {}
  }

  async function handleGoogleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashbaord",
      });
    } catch (error) {
      setError("Enable login via Google");
    }
  }

  async function handleGitHubLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      setError("Enable to login via Github");
    }
  }

  return (
    <>
      <AnimatePresence>
        {!pendingVerification ? (
          <motion.div className="w-full mx-4 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="px-2  py-5 md:px-4 md:py-10">
              <CardHeader>
                <div className="flex justify-center items-center gap-x-2 mb-2">
                  <ArrowLeft size={20} className="text-[#4caf4f]" />
                  <div className="w-2 h-2 rounded-full bg-[#4caf4f]"></div>
                </div>

                <CardTitle className="uppercase text-xl md:text-3xl text-center tracking-tighter">
                  welcome to nexus&#33;
                </CardTitle>
                <CardDescription className="text-muted-foreground text-center text-xs lg:text-sm">
                  Organize your thoughts&#44; ideas&#44; and work—all in one place&#46;
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="py-6 mt-4"
                  required
                />

                <Button
                  onClick={handleSubmit}
                  className="w-full font-medium text-sm mt-4 cursor-pointer "
                >
                  Login
                </Button>

                <div className="relative">
                  <Separator className="my-10 relative" />
                  <div className="absolute left-1/2 -translate-1/2 top-0 bg-card px-4 text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                    Or continue with
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <Button
                    onClick={handleGoogleLogin}
                    className="w-1/2 !py-2 text-xs cursor-pointer "
                  >
                    <FaGoogle />
                    Google
                  </Button>

                  <Button
                    onClick={handleGitHubLogin}
                    className="w-1/2 !py-2 text-xs cursor-pointer "
                  >
                    <IoLogoGithub />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="text-sm mt-5 text-center text-muted-foreground">
              Secure &middot; Private &middot; Professional
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="min-w-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Verify your Identity</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">{`An OTP has been sent your email ${email}`}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col items-center">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <Button
                  onClick={handleVerify}
                  className="w-full mt-4 "
                >
                  Verify
                </Button>

                <Button
                  disabled={resendTimer}
                  onClick={handleResendCode}
                  className={`text-sm text-muted-foreground mt-4 bg-transparent hover:bg-transparent cursor-pointer`}
                >
                  {resendTimer ? `Resend in ${resendCountDown}` : "Resend OTP"}
                </Button>
              </CardContent>
            </Card>
            <div className="text-sm mt-5 text-center text-muted-foreground">
              Secure &middot; Private &middot; Professional
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence key={"error_success"}>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-5 right-5 min-w-96"
          >
            <Alert variant='destructive'>
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-5 right-5 min-w-96"
          >
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
