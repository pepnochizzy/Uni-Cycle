"use server";

import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function deletePost(formData) {
  const id = formData.get("id");

  const user = await currentUser();
  const userId = user?.id;

  const check = await db.query(`SELECT clerk_id FROM uni_posts WHERE id = $1`, [
    id,
  ]);

  if (!check.rows.length || check.rows[0].clerk_id !== userId) {
    throw new Error("Not allowed");
  }

  await db.query(`DELETE FROM uni_posts WHERE id = $1`, [id]);
  redirect(`/marketplace}`);
}
