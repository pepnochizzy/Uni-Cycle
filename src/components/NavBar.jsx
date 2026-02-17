import Link from "next/link";
import NavDropdown from "./NavDropdown";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnections";
import Image from "next/image";
import logo from "@/../public/assets/logo.png";

//homepage, market  place, profile page/sign out
export default async function Navbar() {
  const { userId } = await auth();
  console.log({ userId });
  const usernameQuery = await db.query(
    `SELECT username FROM uni_users where clerk_id = $1`,
    [userId],
  );
  const user = usernameQuery.rows[0];
  return (
    // <nav className="flex place-content-between">
    <nav>
      <Link href={"/"}>
        <Image src={logo} alt="Uni-cycle logo" height={80} />
      </Link>
      {/* <div className="flex w-60"> */}
      <div>
        {/* <Link href={"/"} className="pr-4 border-r-2 border-r-[#77AF9C]"> */}
        <Link href={"/"}>Home</Link>&nbsp;|&nbsp;
        {/* <Link href={"/marketplace"} className="pl-4 pr-4 border-r-2 border-r-[#77AF9C]"> */}
        <Link href={"/marketplace"}>Marketplace</Link>&nbsp;|&nbsp;
        {/* <div className="pl-4"> */}
        <Link href={`/studentarea/${user.username}`}>Profile</Link>
        <div className="dropdown">
          <NavDropdown />
        </div>
      </div>
    </nav>
  );
}
