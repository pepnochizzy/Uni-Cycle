import SubmitForm from "@/components/SubmitForm";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Homepage</h2>
      <SubmitForm />
      {/* just put bg color and flex for our visibility, remove when styling */}


        <div>
          <SignUpButton />
          <SignInButton />
        </div>

    </div>
  );
}
