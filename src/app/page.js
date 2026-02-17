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
        <h2>Homepage</h2>
        <SignedOut>
          <div className="sign-buttons">
            <SignUpButton className="button" />
            <SignInButton className="button" />
          </div>
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
