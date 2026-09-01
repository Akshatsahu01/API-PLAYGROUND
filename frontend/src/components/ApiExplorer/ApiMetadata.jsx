import "./ApiMetadata.css"

function Apimetadata(props) {
  const apiMetadata = props.metadata;

  return (
    <div className="api-metadata">

      <section>
        <h3>Request</h3>

        <p>
          <strong>Method:</strong> {apiMetadata.method}
        </p>
        <p>
          <strong>Body:</strong> None
        </p>
        <p>
            <strong>payloadSize: </strong>0 B
        </p>
        
      </section>

      <section>
        <h3>Response</h3>

        <p>
          <strong>Status:</strong>{" "}
          {apiMetadata.status} {apiMetadata.statusText}
        </p>

        <p>
          <strong>Response Time:</strong>{" "}
          {apiMetadata.responseTime} ms
        </p>

        <p>
          <strong>Content Type:</strong>{" "}
          {apiMetadata.contentType}
        </p>
        <p><strong>PayloadSize</strong>{" "}
        {apiMetadata.payloadSize} B
        </p>
      </section>

    </div>
  );
}

export default Apimetadata