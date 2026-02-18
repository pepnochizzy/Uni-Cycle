import { db } from "@/utils/dbConnections";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import SubmitForm from "@/components/SubmitForm";
import { MessageSquare, Heart } from "lucide-react";
import style from "@/styles/comments.module.css";

export default async function MarketPlace() {
  //TODO: filter users so they can only see posts from students at the same university

  const user = await currentUser();
  const userId = user?.id;
  const { rows: userRows } = await db.query(
    `SELECT university FROM uni_users WHERE clerk_id = $1`,
    [userId],
  );

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

  // const parsedMarketItems = marketItems.rows;
  // console.log(marketItems);

  return (
    <>
      <h1>Marketplace</h1>
      <div>
        <SubmitForm />
      </div>
      <div>
        {marketItems.rows.length === 0 && (
          <p>No posts yet from students at your university.</p>
        )}
        {marketItems.rows.length > 0 &&
          marketItems.rows.map((marketItem) => {
            return (
              <article key={marketItem.id}>
                <Link href={`marketplace/users/${marketItem.username}`}>
                  <p className="font-bold">{marketItem.username}</p>
                </Link>
                <p>In category: {marketItem.category}</p>
                <Image
                  src={marketItem.image}
                  alt={marketItem.post}
                  width={300}
                  height={300}
                  style={{
                    clipPath: "inset(0 20% 40% 0 round 15%)",
                  }}
                />
                <p className={style.date}>
                  {" "}
                  Posted: {marketItem.created_at.toLocaleString()}
                </p>
                <div className="post-info">
                  <p>{marketItem.post}</p>
                </div>
                <div className={style.marketButtonDiv}>
                  <div className="flex flex-row gap-5">
                    <p className="flex flex-row justify-start">
                      <Heart /> {marketItem.likes_count}
                    </p>
                    <p className="flex flex-row justify-end">
                      <MessageSquare />
                      {marketItem.comment_count}
                    </p>
                  </div>
                  <div className={style.buttonDiv}>
                    <Link
                      className="button"
                      href={`/marketplace/${marketItem.id}`}
                      title="view listing"
                    >
                      view
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
}
