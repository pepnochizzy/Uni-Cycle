import { db } from "@/utils/dbConnections";
import Link from "next/link";
import Image from "next/image";

export default async function MarketPlace() {
  const marketItems = await db.query(`SELECT uni_posts.*,
      (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
      (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count,
      uni_users.username
     FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id
     ORDER BY uni_posts.created_at DESC`);
  // const parsedMarketItems = marketItems.rows;
  // console.log(marketItems);

  return (
    <>
      <h2>Marketplace</h2>
      <div>
        {marketItems.rows.map((marketItem) => {
          return (
            <article key={marketItem.id}>
              <Link
                className="button"
                href={`/marketplace/${marketItem.id}`}
                title="view listing"
              >
                <Image
                  src={marketItem.image}
                  alt={marketItem.post}
                  width={1000}
                  height={1000}
                />
                <div>
                  <p>{marketItem.username}:</p>
                  <p>{marketItem.post}</p>
                  <p>
                    Category: {""} {marketItem.category}
                  </p>
                </div>
                <p>view</p>
                <p>
                  Posted at: {""}{" "}
                  {new Date(marketItem.created_at).toLocaleString()}
                </p>
                <p>❤️ {marketItem.likes_count}</p>
                <p>💬{marketItem.comment_count}</p>
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}
