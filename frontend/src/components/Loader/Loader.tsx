import Image from "next/image";
import LoadingSVG from "/public/loader.svg";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Image src={LoadingSVG} width={100} alt="Loading animation" />
    </div>
  );
}
