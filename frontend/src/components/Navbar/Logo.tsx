import Image from "next/image";
import LogoDark from "../../../public/logo-dark.png";
import LogoLight from "../../../public/logo-light.png";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Logo() {
  const { resolvedTheme } = useTheme();
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Link href={token ? "/dashboard" : "/"} className="flex items-center gap-3">
      {resolvedTheme === "light" ? (
        <Image src={LogoLight} alt="Logo" width={250} />
      ) : (
        <Image src={LogoDark} alt="Logo" width={250} />
      )}
    </Link>
  );
}

export default Logo;
