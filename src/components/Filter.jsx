"use client";

import { useRouter } from "next/navigation";

export default function Filters({ searchParams }) {
  const router = useRouter();

  const updateParam = (key, value) => {
    const url = new URLSearchParams(window.location.search);

    if (value) url.set(key, value);
    else url.delete(key);
    router.push(`/marketplace?${url.toString()}`);
  };

  return (
    <div className="flex gap-3 mb-4">
      <select
        className="px-3 py-1.5 rounded-lg border border-[#285943] bg-[#d7fff1]"
        defaultValue={searchParams.category || ""}
        onChange={(e) => updateParam("category", e.target.value)}
      >
        <option value="">Select a Category</option>
        <option value="Sell">Sell</option>
        <option value="Buy">Buy</option>
        <option value="Lessons">Lessons</option>
        <option value="Event">Event</option>
        <option value="Borrow">Borrow</option>
        <option value="Other">Other</option>
      </select>

      <select
        className="px-3 py-1.5 rounded-lg border border-[#285943] bg-[#d7fff1]"
        defaultValue={searchParams.sort || ""}
        onChange={(e) => updateParam("sort", e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="cat_asc">Category A → Z</option>
        <option value="cat_desc">Category Z → A</option>
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
      </select>
    </div>
  );
}
