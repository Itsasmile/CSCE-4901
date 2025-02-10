import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import { User } from "@/lib/types";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";

interface RootContext {
  title: string;
}

export const Route = createRootRoute<RootContext>({
  component: () => <Main />,
});

function Main() {
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthContext value={{ user, setUser }}>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </AuthContext>
  );
}
