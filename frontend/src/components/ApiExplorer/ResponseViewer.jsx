import "./ResponseViewer.css"

function ResponseViewer({data,loading,error}){
 if (loading) {
    return (
      <div className="response-viewer">
        <h3>Response</h3>
        <p>Fetching data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="response-viewer">
        <h3>Response</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="response-viewer">
        <h3>Response</h3>
        <p>No response yet.</p>
      </div>
    );
  }

  return (
    <div className="response-viewer">
      <h3>Response</h3>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default ResponseViewer
