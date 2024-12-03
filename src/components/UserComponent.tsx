import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ReactNode, useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AuthState } from "@/lib/types";

interface Props {
  authState?: AuthState | null | undefined;
}

export default function UserComponent({ authState }: Props): ReactNode {
  function nav(path: string) {
    document.location.href = path;
  }

  if (!authState?.user)
    return (
      <article className="flex gap-2.5 ml-auto">
        <Button onClick={() => nav("/login")}>Login</Button>
        <Button onClick={() => nav("/register")}>Register</Button>
      </article>
    );

  //console.log(user.displayName);

  const handleLogout = async () => {
    try {
      await authState?.signOut();
      nav("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  
  return (
    <div className="relative profile-container">
      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src={authState.user?.photoURL || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="rounded-full"
          style={{ width: "40px", height: "40px" }}
        />
        {/* <p className="font-bold">{user.displayName}</p>  */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {authState.user?.displayName || "Name not recognized, please change it."}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
