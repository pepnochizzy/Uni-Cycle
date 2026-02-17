import { db } from "@/utils/dbConnections";
import Link from "next/link";
import Image from "next/image";

export default async function MarketPlace() {
  const marketItems = await db.query(`SELECT uni_posts.*,
      (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
      (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count
     FROM uni_posts
     ORDER BY created_at DESC`);
  // const parsedMarketItems = marketItems.rows;
  // console.log(marketItems);

  return (
    <>
      <h2>Marketplace</h2>
      <div>
        {marketItems.rows.map((marketItem) => {
          return (
            <Link key={marketItem.id} href={`/marketplace/${marketItem.id}`}>
              <article>
                <Image
                  src={marketItem.image}
                  alt={marketItem.post}
                  width={256}
                  height={256}
                />
                <p>{marketItem.post}</p>
                <p>{marketItem.category}</p>
                <p>{new Date(marketItem.created_at).toLocaleString()}</p>
                <p>❤️ {marketItem.likes_count}</p>
                <p>💬{marketItem.comment_count}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
