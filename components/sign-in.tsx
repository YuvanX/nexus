"use client";
import { useState } from "react";
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
import { ArrowLeft } from "lucide-react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <Card className="min-w-md px-4 !py-10">
      <CardHeader>
        <div className="flex justify-center items-center gap-x-2 mb-2">
          <ArrowLeft size={20} className="text-[#4caf4f]"/>
          <div className="w-2 h-2 rounded-full bg-[#4caf4f]"></div>
        </div>

        <CardTitle className="uppercase text-3xl text-center">
          welcome to nexus!
        </CardTitle>
        <CardDescription className="text-muted-foreground text-center">
          Organize your thoughts, ideas, and work—all in one place.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="py-6 mt-4"
        />

        <Button className="w-full font-medium text-sm mt-4 cursor-pointer dark:text-white">
          Login
        </Button>

        <div className="relative">
          <Separator className="my-10 relative" />
          <div className="absolute left-1/2 -translate-1/2 top-0 bg-card px-4 text-muted-foreground text-sm">
            Or continue with
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Button className="!px-16 !py-2 text-xs cursor-pointer dark:text-white">
            <FaGoogle />
            Google
          </Button>

          <Button className="!px-16 !py-2 text-xs cursor-pointer dark:text-white">
            <IoLogoGithub />
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
