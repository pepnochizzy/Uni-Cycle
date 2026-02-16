"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `listings/${fileName}`;

    const { error } = await supabase.storage
      .from("unicycle")
      .upload(filePath, file);

    if (error) {
      console.error(error);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("unicycle").getPublicUrl(filePath);

    onUpload(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
