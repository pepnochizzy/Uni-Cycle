"use client";

import { useState } from "react";
import SubmitForm from "./SubmitForm";

export default function FormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="button">
        Create a new Listing
      </button>

      {open && (
        <div>
          <div>
            <SubmitForm />
            <button onClick={() => setOpen(false)} className="button">
              Exit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
