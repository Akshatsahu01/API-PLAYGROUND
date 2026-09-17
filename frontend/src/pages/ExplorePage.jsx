import { useState } from "react";

import "./ExplorePage.css";
import fakeApis from "../data/fakeApis.js";

function apiUrl(baseUrl) {
  if (!baseUrl?.startsWith("/")) {
    return baseUrl;
  }

  const backendUrl = (
    import.meta.env.VITE_API_URL || window.location.origin
  ).replace(/\/$/, "");

  return `${backendUrl}${baseUrl}`;
}

function CategoryBadge({ category }) {
  return (
    <span className="category-badge" data-category={category}>
      {category}
    </span>
  );
}

function MethodBadge({ method }) {
  return (
    <span className={`method-badge method-badge--${method.toLowerCase()}`}>
      {method}
    </span>
  );
}

function getRequestBody(apiId) {
  if (apiId === "products") {
    return {
      title: "Laptop",
      price: 55000,
      category: "electronics"
    };
  }

  if (apiId === "books") {
    return {
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      genre: "Fantasy"
    };
  }

  if (apiId === "posts") {
    return {
      userId: 1,
      title: "My sample post",
      body: "This is a sample post for testing the API."
    };
  }

  return {};
}

function createUsageSnippet(endpoint, apiId) {
  const url = apiUrl(endpoint.path.replace(":id", "1"));

  if (endpoint.method === "GET") {
    return `fetch("${url}")
  .then((response) => response.json())
  .then((data) => console.log(data));`;
  }

  const body = getRequestBody(apiId);

  return `fetch("${url}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(${JSON.stringify(body, null, 2)})
})
  .then((response) => response.json())
  .then((data) => console.log(data));`;
}

function ApiCard({ api, onViewDetails, isSelected }) {
  return (
    <div className={`api-card ${isSelected ? "api-card--selected" : ""}`}>
      <div className="api-card__header">
        <h3 className="api-card__name">{api.name}</h3>
        <CategoryBadge category={api.category} />
      </div>

      <p className="api-card__short-desc">{api.short_desc}</p>

      <div className="api-card__tags">
        {api.tags?.map((tag) => (
          <span key={tag} className="api-tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="api-card__footer">
        <a
          href={apiUrl(api.base_url)}
          target="_blank"
          rel="noopener noreferrer"
          className="api-card__base-url"
        >
          {apiUrl(api.base_url)}
        </a>

        <button
          className={`view-details-btn ${
            isSelected ? "view-details-btn--active" : ""
          }`}
          onClick={() => onViewDetails(api.id)}
        >
          {isSelected ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
  );
}

function DetailPanel({ detail, onClose }) {
  if (!detail) {
    return null;
  }

  return (
    <div className="detail-panel">
      <div className="detail-panel__header">
        <div>
          <h2 className="detail-panel__title">{detail.name}</h2>
          <CategoryBadge category={detail.category} />
        </div>

        <button
          className="detail-panel__close"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>
      </div>

      <p className="detail-panel__description">
        {detail.description}
      </p>

      <div className="detail-panel__meta">
        <span className="detail-meta-label">Base URL</span>

        <a
          href={apiUrl(detail.base_url)}
          target="_blank"
          rel="noopener noreferrer"
          className="detail-meta-url"
        >
          {apiUrl(detail.base_url)}
        </a>
      </div>

      <div className="detail-panel__tags">
        {detail.tags?.map((tag) => (
          <span key={tag} className="api-tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="detail-section">
        <h4 className="detail-section__title">
          <span className="detail-section__icon">🔗</span>
          Available Endpoints
        </h4>

        <div className="endpoint-list">
          {detail.endpoints.map((endpoint) => (
            <div className="endpoint-item" key={`${endpoint.method}-${endpoint.path}`}>
              <div className="endpoint-item__header">
                <MethodBadge method={endpoint.method} />
                <code>{apiUrl(endpoint.path)}</code>
              </div>

              <p>{endpoint.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h4 className="detail-section__title">
          <span className="detail-section__icon">📦</span>
          Sample Response
        </h4>

        <pre className="detail-code detail-code--json">
          {JSON.stringify(detail.sample_response, null, 2)}
        </pre>
      </div>

      {detail.endpoints.map((endpoint) => (
        <div
          className="detail-section"
          key={`usage-${endpoint.method}-${endpoint.path}`}
        >
          <h4 className="detail-section__title">
            <span className="detail-section__icon">💻</span>
            {endpoint.method} Request Example
          </h4>

          <pre className="detail-code detail-code--js">
            {createUsageSnippet(endpoint, detail.id)}
          </pre>
        </div>
      ))}
    </div>
  );
}

function ExplorePage() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedApi = fakeApis.find((api) => api.id === selectedId);

  function handleViewDetails(id) {
    setSelectedId((currentId) => (currentId === id ? null : id));
  }

  function handleCloseDetail() {
    setSelectedId(null);
  }

  return (
    <section className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore Playground APIs</h1>

        <p className="explore-subtitle">
          Explore sample REST APIs hosted by this playground for practice and
          prototyping.
        </p>
      </div>

      <div
        className={`explore-layout ${
          selectedId ? "explore-layout--split" : ""
        }`}
      >
        <div className="api-grid">
          {fakeApis.map((api) => (
            <ApiCard
              key={api.id}
              api={api}
              isSelected={selectedId === api.id}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {selectedId && (
          <div className="detail-panel-wrapper">
            <DetailPanel
              detail={selectedApi}
              onClose={handleCloseDetail}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ExplorePage;
