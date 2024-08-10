"use client";

import { clearToken } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { navButtons, NavLinks } from "@/utils/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

function NavItems({ loggedIn }: { loggedIn: boolean }) {
  const dispatch = useDispatch();
  const pathName = usePathname();

  return (
    <>
      <div className="sm:flex-row  flex gap-3 flex-col items-center justify-center flex-1 w-[100%]">
        {NavLinks.map((link, i) => {
          if (loggedIn && link.auth) {
            return (
              <Link
                href={link.link}
                key={i}
                className={
                  link.link === pathName
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                }
              >
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
              <Button
                className="w-[100%]"
                key={i}
                onClick={() => {
                  if (link.title === "Logout") dispatch(clearToken());
                }}
              >
                <Link href={link.link}>{link.title}</Link>
              </Button>
            );
          } else if (!loggedIn && !link.auth) {
            return (
              <Button className="w-[100%]" key={i}>
                <Link href={link.link}>{link.title}</Link>
              </Button>
            );
          }
        })}
      </div>
    </>
  );
}

export default NavItems;
