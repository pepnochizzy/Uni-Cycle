import AboutUsStyles from "./AboutUs.module.css";
import EnterAnimate from "./EnterAnimate";

export default function AboutUsOne() {
  return (
    <>
      <EnterAnimate>
        <div className={AboutUsStyles.about_us_1}>
          <h1>Uni-Cycle</h1>
          <h2>About us:</h2>
          <p>
            Have you ever set up your uni dorm room for your studies and either
            had too many items you didn&apos;t need ... or needed items that you
            didn&apos;t have?
          </p>
        </div>
      </EnterAnimate>
      <EnterAnimate>
        <div className={AboutUsStyles.about_us_1}>
          <p>Maybe consider our marketplace service</p>
          <h3>... Uni-Cycle ...</h3>
        </div>
      </EnterAnimate>
      <EnterAnimate>
        <div className={AboutUsStyles.about_us_1}>
          <p>
            ... Our app gives students the capability to manage their inventory
            by establishing an easy to use platform to facilitate the exchange
            of items!
          </p>
          <p>... Remember that geography book that was the wrong one?</p>
          <p>
            ... Remember that clumbersome chair that was too big for your room?
          </p>
          <p>... Remember when you misplaced your utensils?</p>
          <p>
            ... Remember when your assignment was coming up, but you had a
            knowledge gap in a very specific topic?
          </p>
        </div>
      </EnterAnimate>
    </>
  );
}
