import Image from "next/image";
import LoadingSVG from "/public/loader.svg";
import React from "react";

type divProps = React.ComponentPropsWithoutRef<"div">;

export default function Loader({ className }: divProps) {
  return (
    <div className={`flex items-center justify-center ${className || ""}`}>
      <Image src={LoadingSVG} width={100} alt="Loading animation" />
    </div>
  );
}
