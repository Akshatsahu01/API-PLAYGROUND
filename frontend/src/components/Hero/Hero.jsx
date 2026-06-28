import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-text">
            <h1>Learn APIs with Fake Data</h1>

            <p>
              A platform that provides fake REST APIs for students to learn
              API integration and backend development.
            </p>
          </div>

          <div className="hero-action">
            <a href="#api-explorer" className="hero-btn">
              Explore APIs →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;