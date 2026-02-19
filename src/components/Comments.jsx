import { db } from "@/utils/dbConnections";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import style from "@/styles/comments.module.css";
import { CommentForm } from "./CommentsForm";

export default async function Comments({ postId, parentCommentId = null }) {
  async function createComment(formData) {
    "use server";

    const comment = formData.get("comment");
    const submittedpostId = formData.get("post_id");
    const { userId } = await auth();
    const parentCommentId = formData.get("parent_Id");
    if (!userId) {
      redirect("/sign-in");
    }

    await db.query(
      `INSERT INTO uni_comments(comment, clerk_id, post_id, parent_id) VALUES($1, $2, $3, $4)`,
      [comment, userId, submittedpostId, parentCommentId],
    );
    revalidatePath(`/marketplace/${postId}`);
  }

  const commentQuery = `SELECT uni_comments.id, uni_comments.comment, uni_comments.created_at, uni_users.username FROM uni_comments JOIN uni_users ON uni_comments.clerk_id = uni_users.clerk_id WHERE uni_comments.post_id = $1 AND parent_id ${
    parentCommentId ? `= $2` : `IS NULL`
  }`;

  const commentArgs = [postId];

  if (parentCommentId) {
    commentArgs.push(parentCommentId);
  }
  const comments = await db.query(commentQuery, commentArgs);

  // ORDER BY uni_comments.created_at ASC this was taken out for testing from the query above
  return (
    <>
      <ul className="ml-4">
        {comments.rows.map((comment) => (
          <li key={comment.id} className={style.commentDiv}>
            <p className={style.username}>{comment.username}</p>
            <p className={style.date}>
              {new Date(comment.created_at).toLocaleString()}
            </p>
            <div className="ml-4 border-l border-[#285943] pl-2 flex flex-col space-y-1">
              <span className="pl-4">{comment.comment}</span>
              <CommentForm
                parentCommentId={comment.id}
                action={createComment}
                postId={postId}
              />
              <Comments postId={postId} parentCommentId={comment.id} />
            </div>
          </li>
        ))}
        {parentCommentId === null && (
          <form action={createComment} className={style.commentForm}>
            <input type="hidden" name="post_id" value={postId} />
            <textarea
              name="comment"
              placeholder="Comment here..."
              required
              className={style.textArea}
            />
            <div className={style.buttonDiv}>
              <button type="submit" className={style.buttonSmall}>
                Post
              </button>
            </div>
          </form>
        )}
      </ul>
    </>
  );
}
