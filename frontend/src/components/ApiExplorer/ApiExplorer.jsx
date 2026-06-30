import "./ApiExplorer.css";
import ResponseViewer from "./ResponseViewer";
import apiConfig from "../../data/apiConfig";
import { useState} from "react";


function ApiExplorer() {
    const [selectedApi,setSelectedApi]=useState("doctors")
    const currentApi=apiConfig[selectedApi]
  return (
    <section className="api-explorer">
      <div className="api-container">
       <h2>Api Available</h2>
        {/* API Tab start from here */}

          <div className="api-tabs">
            {Object.keys(apiConfig).map((api)=>(
                <button
                key={api}
                className={selectedApi===api?"active-tab":""}
                onClick={()=>setSelectedApi(api)}
                >
                 {apiConfig[api].endpoint.replace("/","")}
                </button>
            ))}
          </div>
            <div className="filters">
               <div className="filter-header">
                <h3>Filters to apply on URL</h3>
                <button className="reset-btn">reset filters</button>
               </div>
          {currentApi.filters.map((filter) => (

            <div
              className="filter-item"
              key={filter.id}
            >

              <label>
                {filter.label}
              </label>

              <select>

                <option>
                  Select {filter.label}
                </option>

                {filter.options.map((option) => (

                  <option key={option}>
                    {option}
                  </option>

                ))}

              </select>

            </div>

          ))}

            </div>

      </div>

     

    </section>
  );
}

export default ApiExplorer;