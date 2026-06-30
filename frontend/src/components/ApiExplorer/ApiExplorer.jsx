import "./ApiExplorer.css";
import ResponseViewer from "./ResponseViewer";
import apiConfig from "../../data/apiConfig";
import { useState } from "react";

function ApiExplorer() {
  const [selectedApi, setSelectedApi] = useState("doctors");
  const currentApi = apiConfig[selectedApi];
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
            <button className="reset-btn">reset filters</button>
          </div>
          {currentApi.filters.map((filter) => (
            <div className="filter-item" key={filter.id}>
              <label htmlFor={filter.id}>{filter.label}</label>

              <select id={filter.id}>
                <option>Select {filter.label}</option>

                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="filter-actions">

  <button className="apply-btn">
    Apply Filters
  </button>

</div>
       {/* URL Section */}
        <div className="url-section">
            <label >Final URL</label>
            <div className="url-row">
                <input type="text" value={`https://api-playground.com${currentApi.endpoint}`} readOnly />
                <button>fetch data</button>
            </div>
 
        </div>
           {/* Response Section */}
           <ResponseViewer/>
      </div>



    </section>
  );
}

export default ApiExplorer;
