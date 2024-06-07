import React from 'react';

const renderNode = (node) => {
  if (node.type === 'div') {
    return (
      <div key={node.props.className}>
        <div>{node.props.className}</div>
        <div style={{ paddingLeft: '20px' }}>
          {node.props.children.map((child, index) => renderNode(child))}
        </div>
      </div>
    );
  }
  return (
    <div key={node.props.content || node.props.className}>
      {node.type === 'button' && <div>button: {node.props.content}</div>}
      {node.type === 'image' && <div>image</div>}
      {node.type === 'h1' && <div>h1: {node.props.content}</div>}
      {node.type === 'p' && <div>p: {node.props.content}</div>}
    </div>
  );
};

const DomTree = ({ nodes }) => {
  return (
    <div>
      <h2>DOM Tree</h2>
      <div>{nodes.map((node, index) => renderNode(node))}</div>
    </div>
  );
};

export default DomTree;
