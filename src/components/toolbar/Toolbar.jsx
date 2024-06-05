// Toolbar.js
import React from 'react';

function Toolbar({ addElement }) {
  return (
    <div>
      <button onClick={() => addElement({ type: 'text', content: 'New Text' })}>
        Add Text
      </button>
      <button
        onClick={() =>
          addElement({ type: 'image', src: 'https://via.placeholder.com/150' })
        }
      >
        Add Image
      </button>
    </div>
  );
}

export default Toolbar;
