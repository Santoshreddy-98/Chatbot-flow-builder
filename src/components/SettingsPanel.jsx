// Import necessary React features
import React, { useState, useEffect } from "react";

// SettingsPanel component allows editing the selected node's label
// Props:
// - selectedNode: the currently clicked node from the canvas
// - updateNodeLabel: function to update the label of the selected node in state
function SettingsPanel({ selectedNode, updateNodeLabel }) {
  // Local state to hold the editable label
  const [label, setLabel] = useState(selectedNode?.data?.label || "");

  // Whenever a new node is selected, update the input with its label
  useEffect(() => {
    setLabel(selectedNode?.data?.label || "");
  }, [selectedNode]);

  // Handler for input changes
  // Updates both local input and informs parent component via updateNodeLabel
  const handleChange = (e) => {
    setLabel(e.target.value); // Update local input value
    updateNodeLabel(e.target.value); // Sync change with parent (App.jsx)
  };

  return (
    // Main container with padding and light background
    <div
      style={{ padding: "1rem", backgroundColor: "#0f0f0f", height: "100%" }}
    >
      {/* Title */}
      <h3 style={{ marginBottom: "10px" }}>Settings Panel</h3>

      {/* Input box to change the node's label */}
      <input
        type="text"
        value={label} // Binds to state
        onChange={handleChange} // Calls handler on each keystroke
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          backgroundColor: "#fff",
          color: "#000",
        }}
        placeholder="Enter label" // Placeholder if label is empty
      />
    </div>
  );
}

// Export component so it can be used in App.jsx
export default SettingsPanel;
