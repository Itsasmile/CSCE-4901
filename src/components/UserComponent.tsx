import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  user?: User | null | undefined;
}

export default function UserComponent({ user }: Props): ReactNode {
  function nav(path: string) {
    document.location.href = path;
  }

  if (!user)
    return (
      <article className="flex gap-2.5 ml-auto">
        <Button onClick={() => nav("/login")}>Login</Button>
        <Button onClick={() => nav("/register")}>Register</Button>
      </article>
    );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      nav("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="relative profile-container">
      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src={user.photoURL || undefined}
          alt="User Avatar"
          className="rounded-full"
          style={{ width: "40px", height: "40px" }}
        />
        <p className="font-bold">{user.displayName || user.email}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>User Info</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Selected Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => nav("/change-profile")}>
            Change Profile Picture
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => nav("/change-name")}>
            Change Name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => nav("/post")}>
            Create Post
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
