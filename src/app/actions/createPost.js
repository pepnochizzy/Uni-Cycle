"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabaseServer";

export async function createPost(formData) {
  const { userId } = auth();
  const supabase = createServerClient();

  const post = formData.get("post");
  const category = formData.get("category");
  const image = formData.get("image");

  await supabase.from("uni_posts").insert({
    post,
    category,
    image,
    clerk_id: userId,
    created_at: new Date(),
  });

  //   redirect("/marketplace");
}
