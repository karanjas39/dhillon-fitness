"use client";

import { ReactNode, useEffect } from "react";
import { RootState } from "@/store/index";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface propTypes {
  children: ReactNode;
}

function ProtectedRoutes({ children }: propTypes) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  return <>{children}</>;
}

export default ProtectedRoutes;
