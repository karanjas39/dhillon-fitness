"use client";

import { useEffect } from "react";
import { RootState } from "@/store/index";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ChildrenProp } from "@/utils/Types/types";

function ProtectedRoutes({ children }: ChildrenProp) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!token && pathName !== "/") router.push("/");
  }, [token, router, pathName]);

  return <>{children}</>;
}

export default ProtectedRoutes;
