"use server";

import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function updatePost(formData) {
  const id = formData.get("id");
  const postText = formData.get("post");
  const category = formData.get("category");
  const image = formData.get("image");

  const user = await currentUser();
  const userId = user?.id;

  const check = await db.query(`SELECT clerk_id FROM uni_posts WHERE id =$1`, [
    id,
  ]);

  if (check.rows[0].clerk_id !== userId) {
    throw new Error("Not allowed");
  }

  await db.query(
    `UPDATE uni_posts SET post = $1, category = $2, image =$3 WHERE id =$4`,
    [postText, category, image, id],
  );
  redirect(`/marketplace/${id}`);
}
