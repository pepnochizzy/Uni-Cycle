import Link from "next/link";
import NavDropdown from "./NavDropdown";

//homepage, market  place, profile page/sign out
export default async function Navbar() {
  return (
    // <nav className="flex place-content-between">
    <nav>
      <Link href={"/"}>Logo placeholder</Link>
      {/* <div className="flex w-60"> */}
      <div>
        {/* <Link href={"/"} className="pr-4 border-r-2 border-r-[#77AF9C]"> */}
        <Link href={"/"}>
          Home
        </Link>&nbsp;|&nbsp;
        {/* <Link href={"/marketplace"} className="pl-4 pr-4 border-r-2 border-r-[#77AF9C]"> */}
        <Link href={"/marketplace"}>
          Marketplace
        </Link>&nbsp;|&nbsp;
        {/* <div className="pl-4"> */}
        <div className="dropdown">
          <NavDropdown />
        </div>
      </div>
    </nav>
  );
}
