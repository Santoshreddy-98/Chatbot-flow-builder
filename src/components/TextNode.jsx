// Import React for JSX rendering
import React from "react";

// Import Handle and Position from reactflow to define connection points on the node
import { Handle, Position } from "reactflow";

// Functional component that defines the UI and behavior of a "Text Node"
function TextNode({ data }) {
  return (
    // Outer container for the node with styling
    <div
      style={{
        padding: "10px",
        border: "2px solid #333",
        borderRadius: "8px",
        backgroundColor: "#ffffff", // Node background color
        color: "#000", // Text color
        width: "140px",
        textAlign: "center",
        fontWeight: "bold", // Bold label text
      }}
    >
      {/* Incoming connection handle (left side) */}
      <Handle
        type="target" // Accepts incoming edges
        position={Position.Left} // Positioned on the left
      />

      {/* Main label text rendered inside the node */}
      <div>{data.label || "Text Node"}</div>

      {/* Outgoing connection handle (right side) */}
      <Handle
        type="source" // Sends outgoing edges
        position={Position.Right} // Positioned on the right
      />
    </div>
  );
}

// Export this node component so it can be used in nodeTypes map in App.jsx
export default TextNode;
