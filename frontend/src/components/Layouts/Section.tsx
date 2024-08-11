import { ChildrenProp } from "@/utils/Types/types";

function Section({ children }: ChildrenProp) {
  return (
    <section className="mt-6 sm:w-[85%] mx-auto w-[95%] mb-6">
      {children}
    </section>
  );
}

export default Section;
