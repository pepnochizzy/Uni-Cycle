import { db } from "@/utils/dbConnections";
import HomepageListings from "./HomepageListings";

export default async function HomepageFeed() {
  const feedItems = await db.query(
    `SELECT * FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id ORDER BY  uni_posts.created_at DESC LIMIT 5 `,
  );
  console.log(feedItems);
  const posts = feedItems.rows;

  return (
    <>
      <div>
        <div>
          <h2>What other students are selling</h2>
        </div>
        <div>
          {posts.map((post) => (
            <HomepageListings key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
