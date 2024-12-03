import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error, handleRegister, setUser, setEmail, setPassword } =
    useRegister();
    

  return (
    <div className="border-border flex justify-center items-center h-screen">
      <div className="border-border border bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <Label htmlFor="name">Username</Label>
            <Input
              type="text"
              id="displayName"
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            ></Input>
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            ></Input>
          </div>
          <Label htmlFor="password">Password</Label>
          <div className="mb-4">
            <Input
              type="password"
              id="password"
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a password"
              required
            ></Input>
            <Label className="invisible peer-focus:peer-invalid:visible text-pink-600 text-sm">
              Password must be at least 6 characters long.
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
