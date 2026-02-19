import AboutUsStyles from "./AboutUs.module.css";
import EnterAnimate from "./EnterAnimate";

export default function AboutUsOne() {
  return (
    <>
      <EnterAnimate>
        <div className={AboutUsStyles.about_us_1}>
          <h1 className="font-bold">Uni-Cycle</h1>
          <h2>About us</h2>
          <p>
            Have you ever set up your uni dorm room for your studies and either
            had too many items you didn&apos;t need or needed items that you
            didn&apos;t have? <br />
            Maybe you are finished with your studies and can&apos;t find a home
            for all your things?
          </p>
        </div>
      </EnterAnimate>
      <EnterAnimate>
        <div className={AboutUsStyles.about_us_1}>
          <p>Consider our marketplace service!</p>
          <h2>Uni-Cycle</h2>
        </div>
      </EnterAnimate>
      <EnterAnimate>
        <ul style={{ listStyleType: "disc" }}>
          <li>
            Our app gives students the capability to manage their inventory by
            establishing an easy to use platform to facilitate the exchange of
            items!
          </li>
          <li>Remember that geography book that was the wrong one?</li>
          <li>
            Remember that clumbersome chair that was too big for your room?
          </li>
          <li>Remember when you misplaced your utensils?</li>
          <li>
            Remember when your assignment was coming up, but you had a knowledge
            gap in a very specific topic?
          </li>
        </ul>
      </EnterAnimate>
    </>
  );
}
