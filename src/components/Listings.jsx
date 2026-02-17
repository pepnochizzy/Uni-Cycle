import Image from "next/image";
import Likes from "./Likes";
import Comments from "./Comments";

export default function Listings({ post }) {
  return (
    <>
      <div>
        <p>{post.username}</p>
      </div>

      <div>
        <p>{post.post}</p>

        <div>
          <p>Category: {post.category}</p>
        </div>

        {post.image && (
          <Image
            src={post.image}
            alt={post.post || "Listing Image"}
            width={300}
            height={300}
          />
        )}
        <p>Posted at: {new Date(post.created_at).toLocaleString()}</p>
        <Likes postId={post.id} likesCount={post.likes_count} />
        <Comments postId={post.id} />
      </div>
    </>
  );
}
