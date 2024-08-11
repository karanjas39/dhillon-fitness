import Image from "next/image";
import LogoImage from "/public/logo.png";
import Link from "next/link";
import { APP_NAME } from "@/utils/constants";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src={LogoImage} alt="Logo image" width={40} />
      <p className="sm:text-xl text-base font-bold">{APP_NAME}</p>
    </Link>
  );
}

export default Logo;
