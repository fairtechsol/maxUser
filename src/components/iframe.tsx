import React, { useEffect, useState } from "react";

const Iframe = ({ src }: { src: string }) => {
  const [loading, setLoading] = useState(true);
  const [hasResponse, setHasResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIframeSrc = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout after 5 seconds

        const response = await fetch(src, { signal: controller.signal });
        clearTimeout(timeoutId);
        
         console.log("response",response)

        if (response.ok) {
          setHasResponse(true);
          setError(null);
        } else {
          console.error("Response not OK:", response.status);
          setHasResponse(false);
          setError("Response not OK.");
        }
      } catch (error) {
        console.error("Error checking iframe source:", error);
        setError("Failed to fetch iframe source.");
        setHasResponse(false);
      } finally {
        setLoading(false);
      }
    };

    if (src) {
      checkIframeSrc();
    }
  }, [src]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && hasResponse ? (
        <iframe 
          src={src} 
          title="example iframe" 
          style={{ width: '100%', height: '105px' }} 
          onLoad={() => console.log("Iframe loaded successfully")}
          onError={(e) => console.error("Iframe load error:", e)}
        />
      ) : !loading && error ? (
        <p>{error}</p>
      ) : null}
    </div>
  );
};

export default Iframe;
