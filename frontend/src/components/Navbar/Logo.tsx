import Image from "next/image";
import LogoImage from "/public/logo.png";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src={LogoImage} alt="Logo image" width={40} />
      <p className="text-xl font-bold">Dhillon Fitness</p>
    </div>
  );
}

export default Logo;
