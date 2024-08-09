"use client";

import { useEffect } from "react";
import { RootState } from "@/store/index";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ChildrenProp } from "@/utils/Types/types";

function ProtectedRoutes({ children }: ChildrenProp) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  return <>{children}</>;
}

export default ProtectedRoutes;
