"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ThemeModeToggle } from "@/components/Theme/ThemeModeToggle";
import Logo from "@/components/Navbar/Logo";
import { useEffect, useState } from "react";
import { navButtons, NavLinks } from "@/utils/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setLoggedIn(false);
    else setLoggedIn(true);
  }, []);

  return (
    <div className="p-4 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeModeToggle />
        <Sheet>
          <SheetTrigger className="block sm:block">
            <HamburgerMenuIcon className="w-[30px] h-[30px] cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6 w-[70%]">
            <SheetHeader className="mt-4">
              <SheetTitle className="font-bold text-xl">
                Dhillon Fitness
              </SheetTitle>
              <SheetDescription>
                Empowering your gym management with ease and efficiency.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 w-[100%]">
              {NavLinks.map((link, i) => {
                if (loggedIn && link.auth) {
                  return (
                    <Link href={link.link} key={i}>
                      {link.title}
                    </Link>
                  );
                } else if (!loggedIn && !link.auth) {
                  return (
                    <Link href={link.link} key={i}>
                      {link.title}
                    </Link>
                  );
                }
              })}
            </div>
            <div className="w-[100%]">
              {navButtons.map((link, i) => {
                if (loggedIn && link.auth) {
                  return (
                    <Button className="w-[100%]">
                      <Link href={link.link} key={i}>
                        {link.title}
                      </Link>
                    </Button>
                  );
                } else if (!loggedIn && !link.auth) {
                  return (
                    <Button className="w-[100%]">
                      <Link href={link.link} key={i}>
                        {link.title}
                      </Link>
                    </Button>
                  );
                }
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
