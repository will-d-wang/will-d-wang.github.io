import React from "react";
import PropTypes from "prop-types";
import MermaidOriginal from "@theme-original/Mermaid";

function Mermaid({ children }) {
  // Skip rendering on server side to avoid useColorMode context errors during SSG
  if (typeof window === "undefined") {
    return (
      <pre
        style={{
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "4px",
          overflow: "auto",
          fontSize: "12px",
        }}
      >
        <code>{children}</code>
      </pre>
    );
  }

  // On client side, render the actual mermaid component
  return <MermaidOriginal>{children}</MermaidOriginal>;
}

Mermaid.propTypes = {
  children: PropTypes.node,
};

Mermaid.defaultProps = {
  children: null,
};

export default Mermaid;
