"use client";
import SubmitForm from "./SubmitForm";

//! This way of doing a modal might be super antiquated, haven't used getElementById since before week 6!
export default function SubmitItemModal() {
  const submitItemModal = document.getElementById("submititemmodal");

  const submitItemButton = document.getElementById("additemformmodal");

  const closeModal = document.getElementById("closemodal");

  submitItemButton.onclick = function () {
    submitItemModal.style.display = "block";
  };

  closeModal.onclick = function () {
    submitItemModal.style.display = "none";
  };

  return (
    <>
      <button id="additemformmodal">+ Add Marketplace Item +</button>
      <div id="submititemmodal">
        <span id="closemodal">X</span>
        <SubmitForm />
      </div>
    </>
  );
}
