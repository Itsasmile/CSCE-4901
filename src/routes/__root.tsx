import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import { User } from "@/lib/types";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";

interface RootContext {
  title: string;
}

export const Route = createRootRoute<RootContext>({
  component: () => <Main />,
});

type Theme = "light" | "dark";

function Main() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const theme = localStorage.getItem("theme") as Theme;

    if (theme === "dark") document.body.classList.toggle("dark");
  });

  return (
    <AuthContext value={{ user, setUser }}>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </AuthContext>
  );
}
