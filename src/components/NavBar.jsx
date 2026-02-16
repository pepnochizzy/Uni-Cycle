import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import NavDropdown from "./NavDropdown";

//homepage, market  place, profile page/sign out
export default async function Navbar() {
  const { userId } = await auth();
  return (
    <nav className="flex place-content-between">
      <Link href={"/"}>Logo placeholder</Link>
      <div className="flex w-60">
        <Link href={"/"} className="pr-4 border-r-2 border-r-[#77AF9C]">
          Home
        </Link>
        <Link
          href={"/marketplace"}
          className="pl-4 pr-4 border-r-2 border-r-[#77AF9C]"
        >
          Marketplace
        </Link>
        <div className="pl-4">
          <NavDropdown />
        </div>
      </div>
    </nav>
  );
}
