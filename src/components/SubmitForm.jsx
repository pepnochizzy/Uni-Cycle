"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import ImageUpload from "@/components/Upload";
import { createPost } from "@/app/actions/createPost";

export default function SubmitForm() {
  const [imageUrl, setImageUrl] = useState("");
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.set("image", imageUrl);
    formData.set("clerk_id", user.id);

    const result = await createPost(formData);
    console.log(result);

    e.target.reset();
    setImageUrl("");
  }

  return (
    <>
      <form className="my-form" action={createPost}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>What are you offering?</label>
          <textarea name="post" rows="6" required />
        </div>
        <div>
          <select name="category" required>
            <option value="">Select a Category</option>
            <option value="Sell">Sell</option>
            <option value="Buy">Buy</option>
            <option value="Lessons">Lessons</option>
            <option value="Event">Event</option>
            <option value="Borrow">Borrow</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <ImageUpload onUpload={setImageUrl} />
          <input type="hidden" name="image" value={imageUrl} />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </>
  );
}
