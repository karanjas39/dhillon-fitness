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
import NavItems from "./NavItems";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) setLoggedIn(false);
    else setLoggedIn(true);
  }, [token]);

  return (
    <div className="p-4 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="block sm:hidden">
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
            <NavItems loggedIn={loggedIn} />
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex sm:items-center sm:gap-3">
          <NavItems loggedIn={loggedIn} />
        </div>
        <ThemeModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
