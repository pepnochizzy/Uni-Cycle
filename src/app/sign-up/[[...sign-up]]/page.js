import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <h2>Become a Uni-Cycler!</h2>
      <div className="clerk-auth">
        <SignUp />
      </div>
    </>
  );
}
