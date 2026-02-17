import Image from "next/image";

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
        {/* <Likes></Likes>
    <Comments></Comments> */}
      </div>
    </>
  );
}
