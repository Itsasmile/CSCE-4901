import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error: globalError, handleRegister, setUser, setEmail, setPassword } = useRegister();
  const { user} = useContext(AuthContext);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Redirect when the user state changes and a user is signed in
  useEffect(() => {
    if (user) {
      console.log("User signed in:", user);
    }
  }, [user]);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && emailRegex.test(value) ? null : "Please enter a valid email address.";
  };

  const validatePassword = (value: string) => {
    return value && value.length >= 6 ? null : "Password must be at least 6 characters long.";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  return (
    <div className="border-border flex justify-center items-center h-screen">
      <div className="border-border border bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {globalError && <p className="text-red-500 mb-4">{globalError}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!emailError && !passwordError) {
              handleRegister(e);
            }
          }}
          noValidate
        >
          {/* Username */}
          <div className="mb-4">
            <Label htmlFor="name">Username</Label>
            <Input
              type="text"
              id="displayName"
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              onChange={handleEmailChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-pink-600 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              className={`peer w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter a password"
              minLength={6}
              required
            />
            {passwordError && <p className="text-pink-600 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
           Register
          </Button>
        </form>
      </div>
    </div>
  );
}
