import { db } from "@/utils/dbConnections";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Comments from "@/components/Comments";
import Likes from "@/components/Likes";
import style from "@/styles/comments.module.css";

// export default async function ItemPage({ params }) {
//     const { item } = await params;
//     const query = await db.query(`SELECT * FROM uni_posts WHERE id = $1`, [item]);
//     const data = query.rows;
//     // console.log(data);
//     return (
//         <>
//             <h2>Item Page</h2>
//             <div>
//                 {data.map((marketItem) => {
//                     return (
//                         <div key={marketItem.id} href={`/marketplace/${marketItem.id}`}>
//                             <article>
//                                 <Image
//                                     src={marketItem.image}
//                                     alt={marketItem.post}
//                                     width={1000}
//                                     height={1000}
//                                 />
//                                 <p>{marketItem.post}</p>
//                                 <p>{marketItem.category}</p>
//                                 <p>{marketItem.created_at.toLocaleString()}</p>
//                                 <Link className="button" href={`/marketplace`}>return</Link>
//                             </article>
//                         </div>
//                     );
//                 })}

export default async function ItemPage({ params }) {
  const { item } = await params;
  const query = await db.query(
    `SELECT 
     uni_posts.*,
     (SELECT COUNT(*) FROM uni_likes WHERE post_id = uni_posts.id) AS likes_count,
     (SELECT COUNT(*) FROM uni_comments WHERE post_id = uni_posts.id) AS comment_count, uni_users.username
   FROM uni_posts JOIN uni_users ON uni_posts.clerk_id = uni_users.clerk_id
   WHERE uni_posts.id = $1`,
    [item],
  );
  const data = query.rows;
  // console.log(data);
  return (
    <>
      <h2>Item Page</h2>
      <div>
        {data.map((marketItem) => {
          return (
            <div key={marketItem.id} href={`/marketplace/${marketItem.id}`}>
              <article>
                <p className="font-bold">{marketItem.username}</p>
                <Image
                  src={marketItem.image}
                  alt={marketItem.post}
                  width={1000}
                  height={1000}
                />
                <p>{new Date(marketItem.created_at).toLocaleString()}</p>
                <p className={style.date}>{marketItem.category}</p>
                <p>{marketItem.post}</p>

                <Likes
                  postId={marketItem.id}
                  likesCount={marketItem.likes_count}
                />
                <Comments postId={marketItem.id} />
                <Link className="button" href={`/marketplace`}>
                  return
                </Link>
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}
