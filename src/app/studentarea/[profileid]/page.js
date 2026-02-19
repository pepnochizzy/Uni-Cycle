import Listings from "@/components/Listings";
import { db } from "@/utils/dbConnections";
import { notFound } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import style from "@/styles/studentarea.module.css";
import { GraduationCap } from "lucide-react";
import { User } from "lucide-react";
import SubmitForm from "@/components/SubmitForm";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { deletePost } from "@/app/actions/deletePost";

export default async function StudentArea({ params }) {
  const user = await currentUser();
  const userId = user?.id;
  const { profileid } = await params;

  const profileQuery = await db.query(
    `SELECT * FROM uni_users WHERE username =$1 `,
    [profileid],
  );
  console.log(profileQuery);

  if (profileQuery.rows.length === 0) {
    notFound();
  }

  const profile = profileQuery.rows[0];
  console.log(profile);

  const postQuery = await db.query(
    `SELECT uni_posts.id, uni_posts.post, uni_posts.category, uni_posts.image, uni_posts.created_at, uni_users.username, (SELECT COUNT(*) FROM uni_likes WHERE uni_likes.post_id=uni_posts.id) AS likes_count, (SELECT COUNT(*) FROM uni_comments WHERE uni_comments.post_id = uni_posts.id) AS comment_count FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id WHERE uni_posts.clerk_id = $1 ORDER BY uni_posts.created_at DESC`,
    [profile.clerk_id],
  );
  console.log(postQuery);
  const posts = postQuery.rows;

  return (
    <>
      <div className={style.profileDiv}>
        <div className={style.usernameDiv}>
          <h1 className="font-bold">{profile.username}&apos;s Profile</h1>
          <UserButton aria-label="Manage profile" />
        </div>
        <div className="flex flex-row place-content-between">
          <div>
            <h2 className="flex flex-row items-center gap-4">
              <User /> {profile.first_name} {profile.last_name}
            </h2>
          </div>
          <div className={style.uniInfo}>
            <h2 className="flex flex-row items-center gap-4">
              <GraduationCap /> {profile.university}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <SubmitForm />
        </div>
        <h2 className="font-bold">{profile.username}&apos;s Listings</h2>
        {posts.length === 0 && <p>No listings yet</p>}
        <div className="self-center">
          {posts.map((post) => (
            <div key={post.id}>
              <Listings post={post} />

              {profile.clerk_id === userId && (
                <>
                  <Link
                    className="button"
                    href={`/marketplace/${post.id}/edit`}
                  >
                    Edit Post
                  </Link>

                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button className="button">Delete Post</button>
                  </form>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
