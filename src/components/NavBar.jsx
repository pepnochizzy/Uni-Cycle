import Link from "next/link";
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
import { Nanum_Brush_Script } from "next/font/google";

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
    <nav>
      <div>
        <Link href={"/"}>
          <Image src={logo} alt="Uni-cycle logo" height={80} />
        </Link>
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
      <div>
        <Link href={"/"}>Home</Link>&nbsp;|&nbsp;
        <SignedOut>
          <SignInButton className="button" />
          <SignUpButton className="button" />
        </SignedOut>
        <SignedIn>
          {user && <Link href={`/studentarea/${user.username}`}>Profile</Link>}&nbsp;|&nbsp;
          <Link href={"/marketplace"}>Marketplace</Link>&nbsp;|&nbsp;
          <SignOutButton className="button"></SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
}
