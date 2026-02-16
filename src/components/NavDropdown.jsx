import { auth } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

//do we want the nav to show "student area" instead of profile for consistency?
export default async function NavDropdown() {
  "use client";
  const { userId } = auth();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="hover:cursor-pointer">
          <Menu />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content>
          <Dropdown.Item>
            <Link href={`/studentarea/${userId}`}>Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <SignOutButton />
          </Dropdown.Item>
          <Dropdown.Arrow className="fill-[#77AF9C]" />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
