import Image from "next/image";
import style from "@/styles/comments.module.css";

export default function Listings({ post }) {
  return (
    <>
      <div className={style.article}>
        <div>
          <p className={style.username}>{post.username}</p>
        </div>
        <div>
          <p>Category: {post.category}</p>
        </div>
        {post.image && (
          <Image
            src={post.image}
            alt={post.post || "Listing Image"}
            width={300}
            height={300}
            style={{
              clipPath: "inset(5% 20% 40% 0 round 15%)",
            }}
          />
        )}
        <div>
          <p className={style.date}>
            Posted at: {new Date(post.created_at).toLocaleString()}
          </p>
          <p className={style.commentForm}>{post.post}</p>
        </div>
      </div>
    </>
  );
}
