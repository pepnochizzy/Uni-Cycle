"use server";

import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function updateUniversity(formData) {
  const university = formData.get("university");

  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("Not allowed");
  }

  const { rows } = await db.query(
    `SELECT username FROM uni_users WHERE clerk_id =$1`,
    [userId],
  );

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const username = rows[0].username;

  await db.query(`UPDATE uni_users SET university =$1 WHERE clerk_id = $2`, [
    university,
    usser_Id,
  ]);

  redirect(`/studentarea/${username}`);
}
