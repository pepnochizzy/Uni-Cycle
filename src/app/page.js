// home page
// import Link from "next/link";
import { SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <div>
        <SignedOut>
          <SignUpButton>Sign-up</SignUpButton>
          <SignInButton>Login</SignInButton>
        </SignedOut>
      </div>
    </>
  );
}



