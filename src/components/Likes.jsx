import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Likes({ postId, likesCount }) {
  async function likePost() {
    "use server";

    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const { rows } = await db.query(
      `SELECT id FROM uni_likes WHERE post_id = $1 AND clerk_id = $2`,
      [postId, userId],
    );
    if (rows.length === 0) {
      await db.query(
        `INSERT INTO uni_likes (clerk_id, post_id ) VALUES ($1, $2)`,
        [userId, postId],
      );
    }
    revalidatePath(`/marketplace/${postId}`);
  }
  return (
    <>
      <form action={likePost}>
        <button type="submit">❤️ {likesCount}</button>
      </form>
    </>
  );
}
