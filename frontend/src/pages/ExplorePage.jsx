import { useEffect, useState } from "react";
import "./ExplorePage.css";

// Category → color mapping
const CATEGORY_COLORS = {
  "E-commerce": { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  General:      { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  "Auth/Users": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Users:        { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
  Books:        { bg: "#fff1f2", text: "#be123c", border: "#fecdd3" },
  Social:       { bg: "#f0f9ff", text: "#0369a1", border: "#bae6fd" },
};

function CategoryBadge({ category }) {
  const style = CATEGORY_COLORS[category] || {
    bg: "#f1f5f9", text: "#475569", border: "#cbd5e1",
  };
  return (
    <span
      className="category-badge"
      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {category}
    </span>
  );
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
        {api.tags && api.tags.map((tag) => (
          <span key={tag} className="api-tag">#{tag}</span>
        ))}
      </div>
      <div className="api-card__footer">
        <a
          href={api.base_url}
          target="_blank"
          rel="noopener noreferrer"
          className="api-card__base-url"
        >
          {api.base_url}
        </a>
        <button
          className={`view-details-btn ${isSelected ? "view-details-btn--active" : ""}`}
          onClick={() => onViewDetails(api.id)}
        >
          {isSelected ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
  );
}

function DetailPanel({ detail, onClose }) {
  if (!detail) return null;

  return (
    <div className="detail-panel">
      <div className="detail-panel__header">
        <div>
          <h2 className="detail-panel__title">{detail.name}</h2>
          <CategoryBadge category={detail.category} />
        </div>
        <button className="detail-panel__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <p className="detail-panel__description">{detail.description}</p>

      <div className="detail-panel__meta">
        <span className="detail-meta-label">Base URL</span>
        <a href={detail.base_url} target="_blank" rel="noopener noreferrer" className="detail-meta-url">
          {detail.base_url}
        </a>
        {detail.docs_url && (
          <>
            <span className="detail-meta-label">Documentation</span>
            <a href={detail.docs_url} target="_blank" rel="noopener noreferrer" className="detail-meta-url">
              {detail.docs_url}
            </a>
          </>
        )}
      </div>

      <div className="detail-panel__tags">
        {detail.tags && detail.tags.map((tag) => (
          <span key={tag} className="api-tag">#{tag}</span>
        ))}
      </div>

      <div className="detail-section">
        <h4 className="detail-section__title">
          <span className="detail-section__icon">📦</span> Sample Response
        </h4>
        <pre className="detail-code detail-code--json">
          {JSON.stringify(detail.sample_response, null, 2)}
        </pre>
      </div>

      <div className="detail-section">
        <h4 className="detail-section__title">
          <span className="detail-section__icon">💻</span> How to Use (fetch)
        </h4>
        <pre className="detail-code detail-code--js">{detail.usage_snippet}</pre>
      </div>
    </div>
  );
}

function ExplorePage() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch the catalogue list on mount
  useEffect(() => {
    async function fetchApis() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fake-apis`);
        if (!res.ok) throw new Error("Failed to load API catalogue");
        const data = await res.json();
        setApis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApis();
  }, []);

  // Fetch detail for selected API
  async function handleViewDetails(id) {
    // Toggle off if same card clicked again
    if (selectedId === id) {
      setSelectedId(null);
      setDetail(null);
      return;
    }
    setSelectedId(id);
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fake-apis/${id}`);
      if (!res.ok) throw new Error("Failed to load API details");
      const data = await res.json();
      setDetail(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  }

  function handleCloseDetail() {
    setSelectedId(null);
    setDetail(null);
  }

  return (
    <section className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore Public Fake APIs</h1>
        <p className="explore-subtitle">
          Browse popular free &amp; fake REST APIs used by developers to practice
          API integration, prototyping, and frontend development.
        </p>
      </div>

      {loading && (
        <div className="explore-state">
          <div className="spinner" />
          <p>Loading APIs…</p>
        </div>
      )}

      {error && !loading && (
        <div className="explore-state explore-state--error">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className={`explore-layout ${selectedId ? "explore-layout--split" : ""}`}>
          {/* Card grid */}
          <div className="api-grid">
            {apis.map((api) => (
              <ApiCard
                key={api.id}
                api={api}
                isSelected={selectedId === api.id}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Detail panel */}
          {selectedId && (
            <div className="detail-panel-wrapper">
              {detailLoading ? (
                <div className="explore-state">
                  <div className="spinner" />
                  <p>Loading details…</p>
                </div>
              ) : (
                <DetailPanel detail={detail} onClose={handleCloseDetail} />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default ExplorePage;
