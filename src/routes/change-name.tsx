import { createFileRoute } from "@tanstack/react-router";
import { useChangeName } from "@/hooks/changeName";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase";

export const Route = createFileRoute("/change-name")({
  component: RouteComponent,
});

function RouteComponent() {
  const { success, error, handleNameChange, setName } = useChangeName();
  const { loading } = useContext(AuthContext);
  return (
    <div className="border-border flex justify-center items-baseline mt-4 h-screen">
      <div className="border-border border bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Change Name</h2>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <form onSubmit={handleNameChange}>
          <div className="mb-4">
            <Label htmlFor="name">New Name</Label>
            <Input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new name"
              required
            ></Input>
          </div>
          {!loading && (
            <Button type="submit" className="w-full">
              Change Name
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
