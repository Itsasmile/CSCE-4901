import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { User } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  user?: User;
}

export default function UserComponent({ user }: Props): ReactNode {
  const navigate = useNavigate();
  const { userSignOut } = useAuth();

  if (!user)
    return (
      <article className="flex gap-2.5 ml-auto">
        <Button onClick={() => navigate({ to: "/login" })}>Login</Button>
        <Button onClick={() => navigate({ to: "/register" })}>Register</Button>
      </article>
    );

  const handleLogout = async () => {
    try {
      await userSignOut();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex gap-2.5 relative profile-container">
      <>
        <img
          src={user.profilePicture || "https://placehold.co/400"}
          alt="User Avatar"
          className="rounded-full"
          style={{ width: "40px", height: "40px" }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{user?.displayName || user?.username}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate({ to: "/change-profile" })}
            >
              Change Profile Picture
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/change-name" })}>
              Change Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/post" })}>
              Create Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </div>
  );
}
