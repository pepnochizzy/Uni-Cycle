"use client";

import { useState } from "react";
import EditProfileForm from "./EditProfile";

export default function EditProfileModal({ profile, universities }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-10 flex flex-col items-center">
      {!open && (
        <button className="button mb-6" onClick={() => setOpen(true)}>
          Change University
        </button>
      )}

      {open && (
        <div>
          {" "}
          <EditProfileForm profile={profile} universities={universities} />
          <div className="flex justify-center mt-8 new-listing">
            <button
              className="button"
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
