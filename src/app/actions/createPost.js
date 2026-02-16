"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export async function createPost(formData) {
  const post = formData.get("post");
  const category = formData.get("category");
  const image = formData.get("image");
  const clerk_id = formData.get("clerk_id");

  console.log("Clerk ID received", clerk_id);

  const { data, error } = await supabaseServer
    .from("uni_posts")
    .insert({
      post,
      category,
      image,
      clerk_id,
      created_at: new Date(),
    })
    .select();

  console.log("INSERT ERROR:", error);
  console.log("INSERT DATA:", data);

  return { success: true };
}
