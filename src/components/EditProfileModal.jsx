"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfile";

export default function EditProfileModal({ profile, universities }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-10 flex flex-col items-center">
      {!open && (
        <button className="button" onClick={() => setOpen(true)}>
          Edit Profile
        </button>
      )}

      {open && (
        <div>
          {" "}
          <EditProfileForm profile={profile} universities={universities} />
          <button
            className="button flex-1 mb-3"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
