import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Add 'export default' here
export default function Options() {
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["apiKey"], (result) => {
      if (result.apiKey) setApiKey(result.apiKey);
    });
  }, []);

  const saveApiKey = () => {
    chrome.storage.local.set({ apiKey }, () => {
      setStatus("API Key saved securely!");
      setTimeout(() => setStatus(""), 3000);
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Weather Extension Settings</h1>
      <label>
        OpenWeather API Key:
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          style={{ width: "100%", margin: "0.5rem 0", padding: "0.5rem" }}
        />
      </label>
      <button
        onClick={saveApiKey}
        style={{ padding: "0.5rem 1rem", background: "#2563eb", color: "white", border: "none", borderRadius: 4 }}
      >
        Save API Key
      </button>
      {status && <div style={{ color: "green", marginTop: "1rem" }}>{status}</div>}
      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Don’t have a key? <a href="https://home.openweathermap.org/api_keys" target="_blank" rel="noopener noreferrer">Get one here</a>.
      </div>
    </div>
  );
}

// This part is correct and should stay:
ReactDOM.createRoot(document.getElementById("root")!).render(<Options />);
