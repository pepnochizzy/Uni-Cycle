import { db } from "@/utils/dbConnections";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import SubmitForm from "@/components/SubmitForm";
import { MessageSquare, Heart } from "lucide-react";
import style from "@/styles/comments.module.css";
import Filters from "@/components/Filter";
import FormModal from "@/components/Modal";

export default async function MarketPlace(props) {
  const searchParams = await props.searchParams;

  const sort = searchParams.sort || "";
  const categoryFilter = searchParams.category || "";

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

  let items = marketItems.rows;

  //TODO: Convert date strings to Date objects for sorting

  items = items.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));

  //TODO: Filtering

  if (categoryFilter) {
    items = items.filter((item) => item.category === categoryFilter);
  }

  //TODO: Sorting

  if (sort === "cat_asc") {
    items.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sort === "cat_desc") {
    items.sort((a, b) => b.category.localeCompare(a.category));
  } else if (sort === "date_asc") {
    items.sort((a, b) => a.created_at - b.created_at);
  } else if (sort === "date_desc") {
    items.sort((a, b) => b.created_at - a.created_at);
  }

  // const parsedMarketItems = marketItems.rows;
  // console.log(marketItems);

  return (
    <>
      <h1 className="font-bold">Marketplace</h1>
      <Filters searchParams={searchParams} />
      <div>
        <FormModal />
      </div>
      <div>
        {items.length === 0 && (
          <p>No posts yet from students at your university.</p>
        )}
        <div className={style.gridContainer}>
          {items.length > 0 &&
            items.map((marketItem) => {
              return (
                <article key={marketItem.id}>
                  <Link href={`marketplace/users/${marketItem.username}`}>
                    <p className="font-bold">{marketItem.username}</p>
                  </Link>
                  <p>In category: {marketItem.category}</p>
                  <div className="list-img">
                    <Image
                      src={marketItem.image}
                      alt={marketItem.post}
                      width={300}
                      height={300}
                    // style={{
                    //   clipPath: "inset(0 20% 40% 0 round 15%)",
                    // }}
                    />
                  </div>
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
      </div>
    </>
  );
}
