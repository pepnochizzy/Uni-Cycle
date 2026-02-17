// root / homepage
import SubmitForm from "@/components/SubmitForm";
import AboutUsOne from "@/components/AboutUsOne";
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
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SubmitForm />
      </div>
      <AboutUsOne />
    </>
  );
}
