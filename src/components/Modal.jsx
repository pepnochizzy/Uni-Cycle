"use client";

import { useState } from "react";
import SubmitForm from "./SubmitForm";

export default function FormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center mt-8">
        <button onClick={() => setOpen(true)} className="button">
          Create a new Listing
        </button>
      </div>
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
