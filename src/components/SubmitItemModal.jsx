"use client";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import SubmitForm from "./SubmitForm";
import { useRouter } from "next/router";

//! This way of doing a modal might be super antiquated, haven't used getElementById since before week 6!
export default function SubmitItemModal() {
  //! This antiquated way didn't work with next !
  //   const submitItemModal = document.getElementById("submititemmodal");

  //   const submitItemButton = document.getElementById("additemformmodal");

  //   const closeModal = document.getElementById("closemodal");

  //   submitItemButton.onclick = function () {
  //     submitItemModal.style.display = "block";
  //   };

  //   closeModal.onclick = function () {
  //     submitItemModal.style.display = "none";
  //   };

  return (
    <>
      <button onClick={routerServerGlobal.back}>
        + Add Marketplace Item +
      </button>
      <div id="submititemmodal">
        <span id="closemodal">X</span>
        <SubmitForm />
      </div>
    </>
  );
}
