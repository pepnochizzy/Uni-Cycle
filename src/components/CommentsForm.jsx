"use client";

import { useState } from "react";
import style from "@/styles/comments.module.css";

export function CommentForm({ postId, parentCommentId, action }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={style.replyDiv}>
      <button onClick={() => setOpen(!isOpen)} className={style.buttonSmall}>
        {isOpen ? "Close" : "Reply"}
      </button>
      {isOpen ? (
        <>
          <form action={action}>
            <input type="hidden" name="parent_Id" value={parentCommentId} />
            <input type="hidden" name="post_id" value={postId} />
            <textarea
              name="comment"
              placeholder="Reply to this comment"
              className={style.textArea}
            />
            <button type="submit" className={style.buttonSmall}>
              Post
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}
