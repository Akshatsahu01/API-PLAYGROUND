import React from "react";
import "../pages/About.css";

function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-content">
          <h1>About API Playground</h1>
          <p className="about-subtitle">
            Explore REST APIs with an intuitive, interactive interface designed
            for developers of all levels.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="about-wrapper">
          {/* Overview */}
          <div className="about-section">
            <h2>What is API Playground?</h2>
            <p>
              API Playground is an interactive web application that simplifies
              the process of exploring and testing REST APIs. Built with a focus
              on user experience, it eliminates the complexity of manually
              constructing API requests, making it perfect for developers,
              students, and QA engineers.
            </p>
            <p>
              Whether you're learning REST API fundamentals, integrating a
              service, or simply exploring available endpoints, API Playground
              provides everything you need in one intuitive interface.
            </p>
          </div>

          {/* Key Features */}
          <div className="about-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>📊 Smart Filtering</h3>
                <p>
                  Select from pre-configured dropdown filters to refine your
                  data queries without writing complex parameter syntax.
                </p>
              </div>
              <div className="feature-card">
                <h3>🔗 Real-Time URL Generation</h3>
                <p>
                  Watch the API URL update in real-time as you apply filters.
                  Copy it directly to use in your application or testing tools.
                </p>
              </div>
              <div className="feature-card">
                <h3>📄 Live JSON Response</h3>
                <p>
                  Execute requests and instantly view formatted JSON responses.
                  See exactly what your API returns in a clean, readable format.
                </p>
              </div>
              <div className="feature-card">
                <h3>💻 Code Generation</h3>
                <p>
                  Generate ready-to-use code snippets in JavaScript, Java,
                  Python, and C++ based on your exact request.
                </p>
              </div>
              <div className="feature-card">
                <h3>⚡ Performance Insights</h3>
                <p>
                  Track response times, HTTP status codes, and response sizes to
                  understand your API's behavior.
                </p>
              </div>
              <div className="feature-card">
                <h3>🏥 Healthcare Data</h3>
                <p>
                  Work with realistic healthcare data including doctors and
                  patient information, complete with queryable attributes.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="about-section">
            <h2>How It Works</h2>
            <div className="workflow-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Select a Resource</h4>
                  <p>
                    Choose between Doctors or Patients to explore that data
                    endpoint.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Apply Filters</h4>
                  <p>
                    Use dropdown filters to narrow down results based on
                    specific attributes.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Execute Request</h4>
                  <p>
                    Click "Fetch Data" to send your request to the backend API.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Inspect Response</h4>
                  <p>
                    View the JSON response, request metadata, and performance
                    metrics.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Generate Code</h4>
                  <p>
                    Use the code generator to get ready-to-use implementations
                    in your preferred language.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-group">
                <h4>Frontend</h4>
                <ul>
                  <li>React - Modern UI framework</li>
                  <li>Vite - Lightning-fast build tool</li>
                  <li>CSS3 - Professional styling</li>
                </ul>
              </div>
              <div className="tech-group">
                <h4>Backend</h4>
                <ul>
                  <li>Node.js - JavaScript runtime</li>
                  <li>Express.js - Web application framework</li>
                  <li>PostgreSQL - Robust relational database</li>
                </ul>
              </div>
              <div className="tech-group">
                <h4>Architecture</h4>
                <ul>
                  <li>RESTful API design</li>
                  <li>Client-server architecture</li>
                  <li>Modular code organization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="about-section">
            <h2>Perfect For</h2>
            <div className="users-grid">
              <div className="user-card">
                <h4>Developers</h4>
                <p>
                  Evaluate APIs, understand endpoints, and get code examples in
                  your programming language.
                </p>
              </div>
              <div className="user-card">
                <h4>Students</h4>
                <p>
                  Learn REST API fundamentals, query parameters, and backend
                  concepts hands-on.
                </p>
              </div>
              <div className="user-card">
                <h4>QA Engineers</h4>
                <p>
                  Test API responses, verify filtering logic, and validate data
                  consistency.
                </p>
              </div>
              <div className="user-card">
                <h4>Technical Reviewers</h4>
                <p>
                  Demonstrate API capabilities to stakeholders with a polished,
                  interactive interface.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="about-cta">
            <h2>Ready to Explore?</h2>
            <p>
              Head over to the API Explorer and start building queries with
              filters, inspecting real responses, and generating code snippets
              in minutes.
            </p>
            <a href="/" className="cta-button">
              Go to API Explorer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
