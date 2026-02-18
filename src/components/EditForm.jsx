"use client";

import { useState } from "react";
import ImageUpload from "@/components/Upload";

export default function EditForm({ post, updatePost }) {
  const [imageUrl, setImageUrl] = useState(post.image);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("image", imageUrl);
    formData.set("id", post.id);

    await updatePost(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="my-form">
      <label>What are you offering?</label>
      <textarea name="post" defaultValue={post.post} required />

      <label>Category</label>
      <select name="category" defaultValue={post.category} required>
        <option value="">Select a Category</option>
        <option value="Sell">Sell</option>
        <option value="Buy">Buy</option>
        <option value="Lessons">Lessons</option>
        <option value="Event">Event</option>
        <option value="Borrow">Borrow</option>
        <option value="Other">Other</option>
      </select>
      <ImageUpload onUpload={setImageUrl} />
      <input type="hidden" name="image" value={imageUrl} />
      <button className="button" type="submit">
        Save Changes
      </button>
    </form>
  );
}
