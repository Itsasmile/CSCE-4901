import { ReactNode, useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import UserComponent from "./UserComponent";
import { AuthContext } from "@/context/AuthContext";
import { Link } from "@tanstack/react-router";

const links: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description: "Home page",
  },
  {
    title: "FAQs",
    href: "/faqs",
    description: "FAQs page",
  },
];

export default function Navbar(): ReactNode {
  const authState = useContext(AuthContext);
  const toggleDarkMode = () => {
    const result = document.body.classList.toggle("dark");

    if (result) localStorage.setItem("theme", "dark");
    else localStorage.setItem("theme", "light");
  };

  const loc = document.location.pathname;
  return (
    <header className="border-border border-b flex justify-between items-center p-4 bg-background">
      <div className="flex justify-start">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/school-9b924.appspot.com/o/logowithoutbg.png?alt=media&token=7dbbe48b-289c-49b4-9102-aaab09d8b028"
          alt="Website Logo"
          className="w-12 h-12 rounded-full border border-white"
        />
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem
              key={link.title}
              className={loc === link.href ? "border border-input rounded" : ""}
            >
              <NavigationMenuItem
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={link.href}>{link.title}</Link>
              </NavigationMenuItem>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 justify-end">
        <UserComponent user={authState?.user} />
        <Button onClick={toggleDarkMode} variant={"ghost"}>
          <i className="bi bi-sun-fill text-2xl block dark:hidden" />
          <i className="bi bi-moon-fill text-2xl dark:block hidden" />
        </Button>
      </div>
    </header>
  );
}
