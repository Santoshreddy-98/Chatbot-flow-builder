// Import React to use JSX and component features
import React from "react";

// Functional component that receives a prop: `onAddTextNode`
function NodesPanel({ onAddTextNode }) {
  return (
    // Container for the panel with padding and dark background
    <div style={{ padding: "1rem", background: "#0f0f0f", color: "#fff" }}>
      {/* Panel title */}
      <h3>Nodes Panel</h3>

      {/* Button to trigger adding a new Text Node */}
      {/* This will call the onAddTextNode function passed from the parent (App.jsx) */}
      <button
        onClick={onAddTextNode}
        style={{
          padding: "10px 14px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Text Node
      </button>
    </div>
  );
}

// Export the component so it can be used in other files like App.jsx
export default NodesPanel;
