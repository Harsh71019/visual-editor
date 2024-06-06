import React from 'react';

const renderNode = (node, handleEdit) => (
  <li key={node.id}>
    {node.type === 'button' ? (
      <div>
        <span>Button: </span>
        <input
          type='text'
          value={node.name}
          onChange={(e) => handleEdit(node.id, e.target.value)}
        />
      </div>
    ) : node.type === 'image' ? (
      <div>Image</div>
    ) : null}
    {node.children && node.children.length > 0 && (
      <ul>{node.children.map((child) => renderNode(child, handleEdit))}</ul>
    )}
  </li>
);

const DomTree = ({ nodes, setNodes }) => {
  const handleEdit = (id, newName) => {
    const updateNode = (nodes) => {
      for (let node of nodes) {
        if (node.id === id) {
          node.name = newName;
        } else if (node.children.length > 0) {
          updateNode(node.children);
        }
      }
    };
    const newNodes = [...nodes];
    updateNode(newNodes);
    setNodes(newNodes);
  };

  return (
    <div>
      <h3>DOM Tree</h3>
      <ul>{nodes.map((node) => renderNode(node, handleEdit))}</ul>
    </div>
  );
};

export default DomTree;
