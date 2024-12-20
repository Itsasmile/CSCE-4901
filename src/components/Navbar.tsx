import { ReactNode, useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import UserComponent from "./UserComponent";
import { AuthContext } from "@/context/AuthContext";

const links: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description: "Home page",
  },
  {
    title: "Software",
    href: "/software",
    description: "Software page",
  },
  {
    title: "Games",
    href: "/games",
    description: "Games page",
  },
  {
    title: "Movies",
    href: "/movies",
    description: "Movies page",
  },
  {
    title: "Forum",
    href: "/forum",
    description: "Forum page",
  },
  {
    title: "FAQs",
    href: "/faqs",
    description: "FAQs page",
  },
];

export default function Navbar(): ReactNode {
  const user = useContext(AuthContext);
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  const loc = document.location.pathname;
  return (
    <header className="border-border border-b grid grid-cols-3 items-center py-4 px-4 bg-background">
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
              <NavigationMenuLink
                href={link.href}
                className={navigationMenuTriggerStyle()}
              >
                {link.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 justify-end">
        <UserComponent authState={user} />
        <Button onClick={toggleDarkMode} variant={"ghost"}>
          <i className="bi bi-sun-fill text-2xl block dark:hidden" />
          <i className="bi bi-moon-fill text-2xl dark:block hidden" />
        </Button>
      </div>
    </header>
  );
}
