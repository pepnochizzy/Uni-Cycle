"use client";
export default function Error({ error, reset }) {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-4 pr-4 flex flex-col items-center">
        <h1 className="text-2xl">So sorry, something went wrong!</h1>
        <h2 className="text-zinc-400 mb-4 text-xl">{error.message}</h2>
        <button
          onClick={() => reset()}
          className="bg-[#77AF9C] text-black px-3 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </>
  );
}
