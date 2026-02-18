import Listings from "@/components/Listings";
import { db } from "@/utils/dbConnections";
import { notFound } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { User } from "lucide-react";
import style from "@/styles/studentarea.module.css";

export default async function usersPage({ params }) {
  const { userid } = await params;
  const userItems = await db.query(
    `SELECT uni_posts.*,
    (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
      (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count,
      uni_users.username
     FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id
     WHERE uni_users.username = $1
     ORDER BY uni_posts.created_at DESC`,
    [userid],
  );
  console.log(userItems);
  const posts = userItems.rows;

  if (userItems.rows.length === 0) {
    notFound();
  }

  const profileQuery = await db.query(
    `SELECT * FROM uni_users WHERE username =$1 `,
    [userid],
  );
  if (profileQuery.rows.length === 0) {
    notFound();
  }
  const profile = profileQuery.rows[0];
  console.log(profile);

  return (
    <>
      <div className={style.profileDiv}>
        <div className={style.usernameDiv}>
          <h1 className="font-bold">{userid}&apos;s Profile</h1>
        </div>
        <div className="flex flex-row place-content-between">
          <div>
            <h2 className="flex flex-row items-center gap-4">
              <User /> {profile.first_name}
            </h2>
          </div>
          <div className={style.uniInfo}>
            <h2 className="flex flex-row items-center gap-4">
              <GraduationCap /> {profile.university}
            </h2>
          </div>
        </div>
      </div>
      {posts.length === 0 && <p>No listings yet</p>}
      <div className="self-center">
        {posts.map((post) => (
          <Listings key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
