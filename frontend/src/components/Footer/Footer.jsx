import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">
          © {currentYear} API Playground
        </p>

        <p className="footer-tech">
          React · Node.js · Express · PostgreSQL
        </p>
      </div>
    </footer>
  );
}

export default Footer;