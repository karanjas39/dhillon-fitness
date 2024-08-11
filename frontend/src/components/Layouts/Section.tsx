import { ChildrenProp } from "@/utils/Types/types";
import React from "react";

type SectionProps = ChildrenProp & React.ComponentPropsWithoutRef<"section">;

export default function Section({
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      className={`mt-6 sm:w-[85%] mx-auto w-[95%] mb-6 ${className || ""}`}
      {...rest}
    >
      {children}
    </section>
  );
}
