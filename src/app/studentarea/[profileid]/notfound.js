import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Oh no! Could not find this user! Let&apos;s cycle back!</p>
      <Link href="/">Return to the homepage</Link>
    </div>
  );
}
