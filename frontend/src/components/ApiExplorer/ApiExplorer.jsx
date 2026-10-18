import "./ApiExplorer.css";
import { useEffect, useState } from "react";
import ResponseViewer from "./ResponseViewer";
import apiConfig from "../../data/apiConfig";
import Codegenerator from "../CodeGenerator/CodeGenerator";
import Apimetadata from "./ApiMetadata";

function ApiExplorer() {
  const [selectedApi, setSelectedApi] = useState("doctors");
  const currentApi = apiConfig[selectedApi];
  const [selectedFilters, setSelectedFilters] = useState({});
  const [generatedUrl, setGeneratedUrl] = useState(
    `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`,
  );
  const [fullUrl,setFullUrl]=useState( `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`)
  const [selectedMethod, setSelectedMethod] = useState("fetch");
  const [responseData, setResponseData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiMetadata, setApiMetadata] = useState({});
  const [deletedresponse,setDeletedres]=useState(false)
  const [deletedapiMetadata,setDeletedData]=useState()
  useEffect(() => {
    setResponseData(null);
    setFetchedData(null);
    setHasFetched(false);
  }, [currentApi]);

  async function fetchData(url = fullUrl) {
    const startTime = Date.now();
    try {
      setLoading(true);
      setError("");
      const response = await fetch(url, { method: "GET" });
      const endTime = Date.now();
      const duration = Math.round(endTime - startTime);

      setApiMetadata({
        method: "GET",
        status: response.status,
        statusText: response.statusText,
        responseTime: duration,
        contentType: response.headers.get("content-type"),
         responseSize:response.headers.get("content-length")
      });
      if (!response.ok) {
        setApiMetadata({
          method: "GET",
          status: response.status,
          statusText: response.statusText,
          responseTime: duration,
          contentType: response.headers.get("content-type"),
           responseSize:response.headers.get("content-length")
        });
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setFetchedData(data);
      // setResponseData(data); // we will set response data in handle fetch and delete function later
      setHasFetched(true);

      console.log("data fetched : ", data);
      return data;
    } catch (err) {
      const endTime = Date.now();
      const duration = Math.round(endTime - startTime);
      setApiMetadata({
        method: "GET",
        status: "Network Error",
        statusText: "Unable to reach server",
        responseTime: duration,
        contentType: "N/A",
         responseSize:"0 B"
      });
      setHasFetched(false);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  function getUrlFilters() {
    return Object.fromEntries(new URL(generatedUrl).searchParams.entries());
  }

  function recordMatchesFilters(record, filters) {
    return Object.entries(filters).every(([key, value]) => {
      if (key === "availability") {
        return record.available === (value === "Available");
      }

      if (key === "experience") {
        return Number(record.experience) >= Number(value.replace("+", ""));
      }

      if (key === "doctorAssigned") {
        return String(record.doctor_id) === value;
      }

      if (key === "age") {
        const age = Number(record.age);
        if (value === "0-18") return age >= 0 && age <= 18;
        if (value === "19-30") return age >= 19 && age <= 30;
        if (value === "31-50") return age >= 31 && age <= 50;
        return age >= 50;
      }

      if (key === "amountToBePaid") {
        const amount = Number(record.amount_to_be_paid);
        if (value === "< ₹1000") return amount < 1000;
        if (value === "₹1000 - ₹5000") return amount >= 1000 && amount <= 5000;
        return amount > 5000;
      }

      return String(record[key]).toLowerCase() === value.toLowerCase();
    });
  }

  async function handleFetchData() {
    let data=fetchedData;
    if (!hasFetched) {
           data = await fetchData();

    if (data === null) return;
    }
    setLoading(true);
    setError("");
    
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    setDeletedres(false)
    try {
      const filters = getUrlFilters();
   const filteredData = Array.isArray(data)
    ? data.filter((record) =>
        recordMatchesFilters(record, filters)
      )
    : fetchedData;
        let size = new TextEncoder().encode(
    JSON.stringify(filteredData)
  ).length;
 setResponseData(filteredData)
  if (filteredData.length==0){
  size=0
}
        setApiMetadata({
        method: "GET",
        status: "200",
        statusText: "OK",
        responseTime: Math.floor(Math.random()*(24)+3),
        contentType: " application/json; charset=utf-8",
         responseSize:size
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    let data = fetchedData;

    if (!hasFetched) {
      const baseUrl = `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`;
      data = await fetchData(baseUrl);
      setHasFetched(true)
    }
    setDeletedres(true)

    if (!Array.isArray(data)) {
      return;
    }

        setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 300));
 try{

   const filters = getUrlFilters();
   const remainingData = data.filter(
     (record) => !recordMatchesFilters(record, filters),
   );
   const remainingDeletedData = data.filter(
     (record) => recordMatchesFilters(record, filters),
   );

   
   setDeletedData(remainingDeletedData);
   setFetchedData(remainingData);
   setResponseData(remainingData);

let size = new TextEncoder().encode(JSON.stringify(remainingData)).length
if (remainingData.length==0){
 size=0
}
         setApiMetadata({
       method: "DELETE",
       status: "200",
       statusText: "OK",
       responseTime: Math.floor(Math.random()*(24)+3),
       contentType: " application/json; charset=utf-8",
        responseSize:size
     });
 }finally{
setLoading(false);
 }
  }

  function handleFilterChange(event) {
    const { id, value } = event.target;

    setSelectedFilters((previousFilters) => {
      if (value === "") {
        const updatedFilters = { ...previousFilters };
        delete updatedFilters[id];
        return updatedFilters;
      }
      return {
        ...previousFilters,
        [id]: value, //without square breaket id will not be treated as a veriable
      };
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
      `${import.meta.env.VITE_API_URL}/api${currentApi.endpoint}`,
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
                onClick={() => {
                  setSelectedApi(api);
                  setSelectedFilters({});
                  setGeneratedUrl(
                    `${import.meta.env.VITE_API_URL}/api${apiConfig[api].endpoint}`,
                  );
                  setFullUrl(`${import.meta.env.VITE_API_URL}/api${apiConfig[api].endpoint}`)
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
                <button className="reset-btn" onClick={handleResetFilters}>
                  Reset Filters
                </button>

                <button className="apply-btn" onClick={handleApplyFilters}>
                  Apply Filters
                </button>
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
                      const value =
                        typeof option === "object" ? option.value : option;
                      const label =
                        typeof option === "object" ? option.label : option;
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
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
              <select
                className="method-select"
                value={selectedMethod}
                onChange={(event) => setSelectedMethod(event.target.value)}
                aria-label="Select request method"
              >
                <option value="fetch">FETCH</option>
                <option value="delete">DELETE</option>
              </select>
              <input type="text" value={generatedUrl} readOnly />
              <button onClick={
                selectedMethod === "fetch" ? handleFetchData : handleDelete
              }>
                {selectedMethod === "fetch" ? "fetch data" : "delete data"}
              </button>
            </div>
          </div>
          {responseData  && <Apimetadata metadata={apiMetadata} />}
          
          {/* Response Section */}
          {  !deletedresponse &&
            < ResponseViewer
              data={responseData}
              loading={loading}
              error={error}
            />
          }
          { deletedresponse &&
            < ResponseViewer
              data={deletedapiMetadata}
              loading={loading}
              error={error}
            />
          }
        </div>
        {console.log(selectedFilters)}
      </section>
      <Codegenerator generatedUrl={generatedUrl} selectedApi={selectedApi} />
    </>
  );
}

export default ApiExplorer;
