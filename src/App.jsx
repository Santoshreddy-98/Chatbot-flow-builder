// Import core React features and hooks
import React, { useCallback, useState, useEffect } from "react";

// Import main React Flow components and utilities
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from "reactflow";

// Import default styles for React Flow
import "reactflow/dist/style.css";

// Import custom node and UI panel components
import TextNode from "./components/TextNode";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";

// Define custom node types to register with React Flow
const nodeTypes = {
  textNode: TextNode,
};

function App() {
  // Local state to store current nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Local state for undo history (stores previous snapshots)
  const [history, setHistory] = useState([]);

  // Local state to keep track of which node is currently selected
  const [selectedNode, setSelectedNode] = useState(null);

  // 🔄 Save current state to history stack for undo functionality
  const saveToHistory = () => {
    setHistory((prev) => [...prev, { nodes, edges }]);
  };

  // 🔁 Undo the last state change (Ctrl+Z support)
  const handleUndo = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
    setHistory((prev) => prev.slice(0, -1));
    setSelectedNode(null);
  };

  // ⌨️ Listen for Delete key (with confirmation) and Ctrl+Z (undo)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle delete key
      if (e.key === "Delete" && selectedNode) {
        const confirmed = window.confirm("Are you sure you want to delete this node?");
        if (!confirmed) return;

        saveToHistory(); // Save state before deletion

        setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              edge.source !== selectedNode.id && edge.target !== selectedNode.id
          )
        );
        setSelectedNode(null); // Clear selection after deletion
      }

      // Handle Ctrl+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNode, nodes, edges, history]);

  // ➕ Create and add a new text node at random position
  const onAddTextNode = () => {
    const newNode = {
      id: `${+new Date()}`, // unique timestamp ID
      type: "textNode",
      data: { label: "Text Message" },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };

    console.log("Adding new node:", newNode);
    setNodes((nds) => [...nds, newNode]);
  };

  // 🔄 Handle node dragging, resizing, or property changes
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // 🔄 Handle edge changes (if needed)
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // ➕ Handle when a user connects two nodes via handles
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // 🎯 When a user clicks on a node, store it in selectedNode
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  // 📝 Update the label of the currently selected node
  const updateNodeLabel = (newLabel) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: newLabel } }
          : n
      )
    );
    setSelectedNode((n) => ({ ...n, data: { ...n.data, label: newLabel } }));
  };

  // ✅ Validate that only one node has no incoming edges
  const validateFlow = () => {
    const nodesWithNoIncomingEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    return nodesWithNoIncomingEdges.length <= 1;
  };

  // 💾 Handle the "Save Flow" button click
  const handleSave = () => {
    if (!validateFlow()) {
      alert("Error: More than one node has empty target handles!");
      return;
    }
    alert("Flow saved successfully!");
  };

  // 🖼️ JSX Layout: Sidebar + Main Canvas
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar (left panel) */}
      <div
        style={{
          width: "250px",
          borderRight: "1px solid gray",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Conditional rendering: Show settings panel if node is selected */}
        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            updateNodeLabel={updateNodeLabel}
          />
        ) : (
          <NodesPanel onAddTextNode={onAddTextNode} />
        )}

        {/* Save Flow Button */}
        <div style={{ padding: "1rem" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Flow
          </button>
        </div>
      </div>

      {/* Main canvas area for React Flow */}
      <div style={{ flex: 1, height: "100%" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background /> {/* Optional grid background */}
            <Controls />   {/* Zoom and pan controls */}
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

// Export the main App component
export default App;
