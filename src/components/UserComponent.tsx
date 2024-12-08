import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AuthState } from "@/lib/types";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "./ui/skeleton";

interface Props {
  authState?: AuthState | null | undefined;
}

export default function UserComponent({ authState }: Props): ReactNode {
  const navigate = useNavigate();

  if (!authState?.user)
    return (
      <article className="flex gap-2.5 ml-auto">
        <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
        <Button onClick={() => navigate({ to: "/register" })}>Register</Button>
      </article>
    );

  const handleLogout = async () => {
    try {
      await authState?.signOut!();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex gap-2.5 relative profile-container">
      {authState.loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      ) : (
        <>
          <img
            src={authState.user!.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="rounded-full"
            style={{ width: "40px", height: "40px" }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{authState.user?.displayName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => navigate({ to: "/change-profile" })}
              >
                Change Profile Picture
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate({ to: "/change-name" })}
              >
                Change Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/post" })}>
                Create Post
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
