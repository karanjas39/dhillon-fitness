import Image from "next/image";
import LogoImage from "/public/logo.png";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src={LogoImage} alt="Logo image" width={40} />
      <p className="text-xl font-bold">DHILLON FITNESS</p>
    </Link>
  );
}

export default Logo;
