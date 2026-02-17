import { db } from "@/utils/dbConnections";
import { notFound } from "next/navigation";
import Image from "next/image";
import Comments from "@/components/Comments";
import Likes from "@/components/Likes";

export default async function ItemPage({ params }) {
  const { item } = await params;
  const query = await db.query(
    `SELECT 
     uni_posts.*,
     (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
     (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count
   FROM uni_posts
   WHERE uni_posts.id = $1`,
    [item],
  );
  const data = query.rows;
  console.log(data);
  return (
    <>
      <h2>Item Page</h2>
      <div>
        {data.map((marketItem) => {
          return (
            <div key={marketItem.id} href={`/marketplace/${marketItem.id}`}>
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
                <Likes
                  postId={marketItem.id}
                  likesCount={marketItem.likes_count}
                />
                <Comments postId={marketItem.id} />
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}
