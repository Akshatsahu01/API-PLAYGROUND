import "./ApiExplorer.css";
import ResponseViewer from "./ResponseViewer";
import apiConfig from "../../data/apiConfig";
import Codegenerator from "../CodeGenerator/CodeGenerator";
import { useState } from "react";

function ApiExplorer() {
  const [selectedApi, setSelectedApi] = useState("doctors");
  const currentApi = apiConfig[selectedApi];
  const [selectedFilters, setSelectedFilters] = useState({});
  const [generatedUrl, setGeneratedUrl] = useState(
  `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`
)
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleFetchData() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(generatedUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setResponseData(data);

      console.log("data fetched : ",data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
}
  function handleFilterChange(event) {
    const { id, value } = event.target;

    setSelectedFilters((previousFilters) => {
        if(value===""){
            const updatedFilters={...previousFilters}
            delete updatedFilters[id]
            return updatedFilters
        }
        return {

            ...previousFilters,
            [id]: value,  //without square breaket id will not be treated as a veriable
        }
    });
  }
  function handleApplyFilters() {

  const queryParams = Object.entries(selectedFilters)
    .filter(([key, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const url =
    queryParams.length > 0
      ? `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}?${queryParams}`
      : `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`;

  setGeneratedUrl(url);
}

function handleResetFilters() {
  setSelectedFilters({});

  setGeneratedUrl(
    `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`
  );
}
  return (
    <>
    <section className="api-explorer">
      <div className="api-container">
        <h2>Available APIs</h2>
        {/* API Tab start from here */}

        <div className="api-tabs">
          {Object.keys(apiConfig).map((api) => (
            <button
              key={api}
              className={selectedApi === api ? "active-tab" : ""}
              onClick={() =>{ 
                  setSelectedApi(api)
                  setSelectedFilters({});
                  setGeneratedUrl(`${import.meta.env.VITE_API_URL}/api${apiConfig[api].endpoint}`);
              }}
            >
              {apiConfig[api].label}
            </button>
          ))}
        </div>
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filters to apply on URL</h3>
            <div className="filter-buttons">
              <button className="reset-btn" onClick={handleResetFilters}>Reset Filters</button>

              <button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</button>
            </div>
          </div>
          <div className="filter-grid">
            {currentApi.filters.map((filter) => (
              <div className="filter-item" key={filter.id}>
                <label htmlFor={filter.id}>{filter.label}</label>

                <select
                  id={filter.id}
                  value={selectedFilters[filter.id] || ""}
                  onChange={handleFilterChange}
                >
                  <option value="">Select {filter.label}</option>

                  {filter.options.map((option) => {
                    const value=typeof option==="object" ? option.value : option
                    const label=typeof option==="object" ? option.label: option
                    return  (
                      <option key={value} value={value}>{label}</option>

                    )
                  })}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* URL Section */}
        <div className="url-section">
          <label>Final URL</label>
          <div className="url-row">
            <input
              type="text"
              value={generatedUrl}
              readOnly
            />
            <button onClick={handleFetchData}>fetch data</button>
          </div>
        </div>
        {/* Response Section */}
        <ResponseViewer data={responseData} loading={loading} error={error}/>
      </div>
      {console.log(selectedFilters)}
    </section>
      <Codegenerator generatedUrl={generatedUrl}/>
      </>
  );
}

export default ApiExplorer;
