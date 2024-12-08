import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RootContext {
  title: string;
}

export const Route = createRootRoute<RootContext>({
  component: () => {
    return (
      <AuthProvider>
        <Navbar />
        <Outlet />
        <TanStackRouterDevtools />
      </AuthProvider>
    );
  },
});
