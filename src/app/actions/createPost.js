"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { auth } from "@clerk/nextjs/server";

export async function createPost(formData) {
  const { userId } = auth();

  const post = formData.get("post");
  const category = formData.get("category");
  const image = formData.get("image");

  const { data, error } = await supabaseServer
    .from("uni_posts")
    .insert({
      post,
      category,
      image,
      clerk_id: userId,
      created_at: new Date(),
    })
    .select();

  console.log("INSERT ERROR:", error);
  console.log("INSERT DATA:", data);

  return { success: true };
}
