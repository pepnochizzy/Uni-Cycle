// sign-in page with Clerk component
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
    return (
        <>
            <h2>Login</h2>
            <div className="clerk-auth">
                <SignIn />
            </div>
        </>
    );
}

