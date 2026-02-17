import Link from "next/link";
import NavDropdown from "./NavDropdown";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnections";
import Image from "next/image";
import logo from "@/../public/assets/logo.png";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

//homepage, market  place, profile page/sign out
export default async function Navbar() {
  const { userId } = await auth();
  let user = null;
  console.log({ userId });

  if (userId) {
    const { rows } = await db.query(
      `SELECT username FROM uni_users where clerk_id = $1`,
      [userId],
    );
    user = rows[0] || null;
  }

  return (
    // <nav className="flex place-content-between">
    <nav>
      <Link href={"/"}>
        <Image src={logo} alt="Uni-cycle logo" height={80} />
      </Link>
      <SignedOut>
        <Link href={"/"}>Home</Link>&nbsp;|&nbsp;
        <SignInButton className="button" />
        <SignUpButton className="button" />
      </SignedOut>
      <SignedIn>
        {user && <Link href={`/studentarea/${user.username}`}>Profile</Link>}
        <Link href={"/marketplace"}>Marketplace</Link>&nbsp;|&nbsp;
        <SignOutButton className="button"></SignOutButton>
      </SignedIn>

      {/* <div className="flex w-60"> */}
      <div>
        {/* <Link href={"/"} className="pr-4 border-r-2 border-r-[#77AF9C]"> */}

        {/* <Link href={"/marketplace"} className="pl-4 pr-4 border-r-2 border-r-[#77AF9C]"> */}
        {/* <div className="pl-4"> */}
      </div>
    </nav>
  );
}
