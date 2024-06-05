import React from 'react';
import Element from '../element/Element';

function Canvas({ elements, updateElement }) {
  return (
    <div
      style={{
        border: '1px solid black',
        height: '500px',
        position: 'relative',
      }}
    >
      {elements.map((element, index) => (
        <Element
          key={index}
          element={element}
          updateElement={(newProps) => updateElement(index, newProps)}
        />
      ))}
    </div>
  );
}

export default Canvas;
