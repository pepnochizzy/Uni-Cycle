import { db } from "@/utils/dbConnections";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import style from "@/styles/comments.module.css";

export default async function Comments({ postId }) {
  async function createComment(formData) {
    "use server";

    const comment = formData.get("comment");
    const submittedpostId = formData.get("post_id");
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    await db.query(
      `INSERT INTO uni_comments(comment, clerk_id, post_id) VALUES($1, $2, $3)`,
      [comment, userId, submittedpostId],
    );
    revalidatePath(`/marketplace/${postId}`);
  }

  const { rows: comments } = await db.query(
    `SELECT uni_comments.id, uni_comments.comment, uni_comments.created_at, uni_users.username FROM uni_comments JOIN uni_users ON uni_comments.clerk_id = uni_users.clerk_id WHERE uni_comments.post_id = $1 ORDER BY uni_comments.created_at ASC  `,
    [postId],
  );

  return (
    <>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className={style.commentDiv}>
            <p className={style.username}>{comment.username}</p>
            <p className={style.date}>
              {new Date(comment.created_at).toLocaleString()}
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}

        <form action={createComment} className={style.commentForm}>
          <input type="hidden" name="post_id" value={postId} />
          <textarea
            name="comment"
            placeholder="Comment here..."
            required
            className={style.textArea}
          />
          <div className={style.buttonDiv}>
            <button type="submit" className="button">
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
