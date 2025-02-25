import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error, handleLogin, enterEmail, enterPassword } = useLogin();
  return (
    <div className="border-border border flex justify-center items-center h-screen">
      <div className=" border-border border bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Member Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              onChange={(e) => enterEmail(e.target.value)}
              placeholder="Email"
              required
            ></Input>
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={(e) => enterPassword(e.target.value)}
              placeholder="Password"
              required
            ></Input>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="text-center mt-6">
          <a href="/register" className="text-gray-700 hover:underline">
            Create your Account &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
