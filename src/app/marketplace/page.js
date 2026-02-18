import { db } from "@/utils/dbConnections";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import SubmitForm from "@/components/SubmitForm";
import { MessageSquare, Heart } from "lucide-react";

export default async function MarketPlace({ searchParams }) {
  //TODO: filter users so they can only see posts from students at the same university

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
     ORDER BY uni_posts.created_at DESC`,
    [userUniversity],
  );

  //========================================
  //! These conditionals *should* read what's written on the search parameters, and then enact a behaviour by affecting orderDir and orderBy, which changes the SQL select query above to specify *how* to order and *which direction*

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

  //========================================

  console.log("MARKETPLACE DEBUG", {
    userId,
    userRows,
    userUniversity,
    postCount: marketItems.rows.length,
    posts: marketItems.rows,
  });

  // const parsedMarketItems = marketItems.rows;
  // console.log(marketItems);

  return (
    <>
      <h1>Marketplace</h1>
      <div>
        <SubmitForm />
      </div>
      <div>
        <Link href={`/marketplace/?sort=asc`}>Oldest to Latest</Link>
        <Link href={`/marketplace/?sort=desc`}>Latest to Oldest</Link>
        <Link href={`/marketplace/?sort=reactdesc`}>Most votes</Link>
        <Link href={`/marketplace/?sort=reactasc`}>Least votes</Link>
      </div>
      <div>
        {marketItems.rows.length === 0 && (
          <p>No posts yet from students at your university.</p>
        )}
        {marketItems.rows.length > 0 &&
          marketItems.rows.map((marketItem) => {
            return (
              <article key={marketItem.id}>
                <Image
                  src={marketItem.image}
                  alt={marketItem.post}
                  width={1000}
                  height={1000}
                />
                <div className="post-info">
                  <p>{marketItem.username}:</p>
                  <p>{marketItem.post}</p>
                  <p>In category: {marketItem.category}</p>
                  <p> Posted at:{marketItem.created_at.toLocaleString()}</p>
                </div>
                <div className="counts">
                  <p className="flex flex-row justify-end">
                    <Heart /> {marketItem.likes_count}
                  </p>
                  <p className="flex flex-row justify-end">
                    <MessageSquare />
                    {marketItem.comment_count}
                  </p>
                </div>
                <Link
                  className="button"
                  href={`/marketplace/${marketItem.id}`}
                  title="view listing"
                >
                  view
                </Link>
              </article>
            );
          })}
      </div>
    </>
  );
}
