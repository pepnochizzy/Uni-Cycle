// root / homepage
import AboutUsOne from "@/components/AboutUsOne";
import HomepageFeed from "@/components/HomepageFeed";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div>
        <SignedOut>
          <div className="sign-buttons"></div>
        </SignedOut>
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
      <AboutUsOne />
      <HomepageFeed />
    </>
  );
}
