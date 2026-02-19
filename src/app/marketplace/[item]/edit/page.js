import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnections";
import { updatePost } from "@/app/actions/updatePost";
import EditForm from "@/components/EditForm";

export default async function EditPost({ params }) {
  const { item } = await params;

  const user = await currentUser();
  const userId = user?.id;

  const query = await db.query(`SELECT * FROM uni_posts WHERE id = $1`, [item]);

  const post = query.rows[0];

  if (!post) return <p>Post not found</p>;

  if (post.clerk_id !== userId) {
    return <p>You are not allowed to edit this post.</p>;
  }

  return (
    <>
      <h1 className="font-bold">Edit your post</h1>
      <EditForm post={post} updatePost={updatePost} />
    </>
  );
}
