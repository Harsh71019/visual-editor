import React from 'react';

const renderNode = (node) => (
  <li key={node.id}>
    {node.id}
    {node.children && node.children.length > 0 && (
      <ul>{node.children.map((child) => renderNode(child))}</ul>
    )}
  </li>
);

const DomTree = ({ nodes }) => {
  return (
    <div>
      <h3>DOM Tree</h3>
      <ul>{nodes.map((node) => renderNode(node))}</ul>
    </div>
  );
};

export default DomTree;
