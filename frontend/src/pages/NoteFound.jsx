import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Error Code */}
        <div className="error-code">404</div>

        {/* Error Message */}
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-description">
          Oops! It seems like the page you're looking for doesn't exist or has
          been moved. Let's get you back on track!
        </p>

        {/* Illustration/Icon */}
        <div className="error-icon">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-svg"
          >
            <circle cx="100" cy="60" r="25" fill="#0ea5a4" opacity="0.2" />
            <circle
              cx="100"
              cy="60"
              r="20"
              fill="none"
              stroke="#0ea5a4"
              strokeWidth="2"
            />
            <path
              d="M 70 80 L 130 80 Q 130 140 100 150 Q 70 140 70 80"
              fill="#0ea5a4"
              opacity="0.15"
              stroke="#0ea5a4"
              strokeWidth="2"
            />
            <circle cx="85" cy="100" r="4" fill="#172554" />
            <circle cx="115" cy="100" r="4" fill="#172554" />
            <path
              d="M 90 120 Q 100 125 110 120"
              stroke="#172554"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Suggestions */}
        <div className="suggestions">
          <p>Here's what you can do:</p>
          <ul className="suggestions-list">
            <li>Check the URL and try again</li>
            <li>Return to the home page</li>
            <li>Visit the About page to learn more</li>
            <li>Contact support if you think this is an error</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <NavLink to="/" className="btn btn-primary">
            ← Back to Home
          </NavLink>
          <NavLink to="/about" className="btn btn-secondary">
            Learn About Us →
          </NavLink>
        </div>

        {/* Search Suggestion */}
        <div className="search-suggestion">
          <p>
            <span className="suggestion-icon">💡</span>
            Use the navigation menu above to explore the API Playground
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
