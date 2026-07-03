import "./ApiExplorer.css";
import ResponseViewer from "./ResponseViewer";
import apiConfig from "../../data/apiConfig";
import { useState } from "react";

function ApiExplorer() {
  const [selectedApi, setSelectedApi] = useState("doctors");
  const currentApi = apiConfig[selectedApi];
  const [selectedFilters, setSelectedFilters] = useState({});
  const [url,setUrl]=useState("")
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
  function createUrl() {
    let newUrl = "?";

    Object.entries(selectedFilters).forEach(([key, value]) => {
        newUrl += `&${key}=${value}`;
    });

    setUrl(newUrl);
}
  return (
    <section className="api-explorer">
      <div className="api-container">
        <h2>Available APIs</h2>
        {/* API Tab start from here */}

        <div className="api-tabs">
          {Object.keys(apiConfig).map((api) => (
            <button
              key={api}
              className={selectedApi === api ? "active-tab" : ""}
              onClick={() => setSelectedApi(api)}
            >
              {apiConfig[api].label}
            </button>
          ))}
        </div>
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filters to apply on URL</h3>
            <div className="filter-buttons">
              <button className="reset-btn">Reset Filters</button>

              <button className="apply-btn" onClick={((event)=>{

                handleFilterChange(event)
                createUrl()

              })}>Apply Filters</button>
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

                  {filter.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
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
              value={`https://api-playground.com${currentApi.endpoint}${url}`}
              readOnly
            />
            <button>fetch data</button>
          </div>
        </div>
        {/* Response Section */}
        <ResponseViewer />
      </div>
      {console.log(selectedFilters)}
    </section>
  );
}

export default ApiExplorer;
