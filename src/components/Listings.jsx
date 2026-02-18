import Image from "next/image";
import Likes from "./Likes";
import Comments from "./Comments";
import style from "@/styles/comments.module.css";

export default function Listings({ post }) {
  return (
    <div className={style.article}>
      <div>
        <p className={style.username}>{post.username}</p>
      </div>

      <div>
        <p>Category: {post.category}</p>
        {post.image && (
          <Image
            src={post.image}
            alt={post.post || "Listing Image"}
            width={300}
            height={300}
            style={{ borderRadius: "20px" }}
          />
        )}
        <p className={style.date}>
          Posted at: {new Date(post.created_at).toLocaleString()}
        </p>
        <p>{post.post}</p>
        <Likes
          postId={post.id}
          likesCount={post.likes_count}
          className={style.likeButton}
        />
        <Comments postId={post.id} />
      </div>
    </div>
  );
}
