import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

function Navbar() {
  return (
    <Sheet>
      <SheetTrigger className="block sm:block">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex items-center justify-center w-[60%]"
      >
        <p>Home</p>
      </SheetContent>
    </Sheet>
  );
}

export default Navbar;
