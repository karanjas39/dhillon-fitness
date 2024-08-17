import Image from "next/image";
import LogoImage from "/public/logo.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Logo() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Link href={token ? "/dashboard" : ""} className="flex items-center">
      <Image src={LogoImage} alt="Gym logo" width={50} />
      <p className="font-bold text-2xl">DHILLON FITNESS</p>
    </Link>
  );
}

export default Logo;
