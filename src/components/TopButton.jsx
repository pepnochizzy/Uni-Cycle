"use client";

export default function TopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button onClick={scrollToTop} className="topBtn" title="return to top">Top</button>
    )
}


