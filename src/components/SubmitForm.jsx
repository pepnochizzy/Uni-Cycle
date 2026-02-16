"use client";

import { useState } from "react";
import ImageUpload from "@/components/Upload";
import { createPost } from "@/app/actions/createPost";

export default function SubmitForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <form className="my-form" action={createPost}>
        <div>
          <label>What are you offering?</label>
          <textarea name="post" rows="6" required />
        </div>

        <div>
          <label>Category</label>
          <select name="category" required>
            <option value="">Select a Category</option>
            <option value="Sell">Sell</option>
            <option value="Lessons">Lessons</option>
            <option value="Event">Event</option>
            <option value="Borrow">Borrow</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Image</label>
          <ImageUpload onUpload={setImageUrl} />
          <input type="hidden" name="image" value={imageUrl} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </>
  );
}
