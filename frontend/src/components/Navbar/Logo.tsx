import Image from "next/image";
import LogoImage from "/public/logo.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Logo() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Link href={token ? "/dashboard" : ""} className="flex items-center">
      <Image
        src={LogoImage}
        alt="Gym logo"
        width={50}
        className="hidden sm:block"
      />
      <p className="font-bold sm:text-2xl text-xl">DHILLON FITNESS</p>
    </Link>
  );
}

export default Logo;
