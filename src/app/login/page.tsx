"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", email, password);
  };

  return (
    <div className="flex items-center min-h-screen justify-center  bg-gradient-to-br from-green-800 to-teal-700">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-default-500">
            Please enter your details to sign in
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <div className="flex justify-between items-center">
              <Link href="#" size="sm">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" color="success">
              Sign In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-default-500">
            Don't have an account?{" "}
            <Link href="#" size="sm">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
