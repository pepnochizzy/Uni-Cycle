"use client";

import { useState } from "react";

export function CommentForm({ postId, parentId, action }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!isOpen)}>
        {isOpen ? "Close" : "Reply"}
      </button>
      {isOpen ? (
        <>
          <form action={action}>
            <input type="hidden" name="parent_Id" value={parentId} />
            <input type="hidden" name="post_id" value={postId} />
            <textarea name="comment" placeholder="Reply to this comment" />
            <button type="submit">Post</button>
          </form>
        </>
      ) : null}
    </>
  );
}
