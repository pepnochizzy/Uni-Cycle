import Listings from "@/components/Listings";
import { db } from "@/utils/dbConnections";
import { notFound } from "next/navigation";

export default async function StudentArea({ params }) {
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
      <div>
        <h1>{profile.username}&apos;s Profile</h1>

        <div>
          <h2>First Name: {profile.first_name}</h2>
          <h2>Last Name: {profile.last_name}</h2>
          <h2>University: {profile.university}</h2>
        </div>
      </div>
      <h2>{profile.username}&apos;s Listings</h2>
      {posts.length === 0 && <p>No listings yet</p>}

      {posts.map((post) => (
        <Listings key={post.id} post={post} />
      ))}
    </>
  );
}
