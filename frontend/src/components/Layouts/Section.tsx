import { ChildrenProp } from "@/utils/Types/types";

function Section({ children }: ChildrenProp) {
  return (
    <section className="mt-6 sm:w-[75%] mx-auto w-[95%]">{children}</section>
  );
}

export default Section;
