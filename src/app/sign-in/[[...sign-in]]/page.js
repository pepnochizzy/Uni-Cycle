// sign-in page with Clerk component
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
    return (
        <>
            <h2>Login</h2>
            <div className="sign-in">
                <SignIn />
            </div>
            <nav>
                <Link href="/" title="home page">Home</Link>
            </nav>
        </>
    );
}

