import { db } from "@/utils/dbConnections";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function MarketSorting({ searchParams }) {
  const user = await currentUser();
  const userId = user?.id;
  const searchSort = await searchParams;
  const { rows: userRows } = await db.query(
    `SELECT university FROM uni_users WHERE clerk_id = $1`,
    [userId],
  );

  //! Sorting types: By date created (uses id), by character (sortof alphabetically), by reactions (likes)
  let orderDir = "DESC";
  let orderBy = "uni_posts.id";

  const userUniversity = userRows[0]?.university;
  const marketItems = await db.query(
    `SELECT uni_posts.*,
      (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
      (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count,
      uni_users.username
     FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id
     WHERE uni_users.university = $1
     ORDER BY ${orderBy} ${orderDir}`,
    [userUniversity],
  );

  if (searchSort.sort === "desc") {
    orderBy = "uni_posts.id";
    orderDir = "DESC";
  } else if (searchSort.sort === "asc") {
    orderBy = "uni_posts.id";
    orderDir = "ASC";
  } else if (searchSort.sort === "reactdesc") {
    orderBy = "COUNT(uni_likes.post_id)";
    orderDir = "DESC";
  } else if (searchSort.sort === "reactasc") {
    orderBy = "COUNT(uni_likes.post_id)";
    orderDir = "ASC";
  }

  //     const marketItems = await db.query(
  //     `SELECT uni_posts.*,
  //       (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
  //       (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count,
  //       uni_users.username
  //      FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id
  //      WHERE uni_users.university = $1
  //      ORDER BY uni_posts.id DESC`,
  //     [userUniversity],
  //   );
  return (
    <>
      <div>
        <Link href={`/marketplace/?sort=asc`}>Oldest to Latest</Link>
        <Link href={`/marketplace/?sort=desc`}>Latest to Oldest</Link>
        <Link href={`/marketplace/?sort=reactdesc`}>Most votes</Link>
        <Link href={`/marketplace/?sort=reactasc`}>Least votes</Link>
      </div>
    </>
  );
}
