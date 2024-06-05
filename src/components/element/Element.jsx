import React from 'react';
import { Rnd } from 'react-rnd';

function Element({ element, updateElement }) {
  return (
    <Rnd
      default={{
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
      }}
      bounds='parent'
      onDragStop={(e, d) => updateElement({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateElement({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
      style={{ border: '1px solid #ddd', padding: '8px' }}
    >
      {element.type === 'text' ? (
        <div>{element.content}</div>
      ) : (
        <img
          src={element.src}
          alt=''
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </Rnd>
  );
}

export default Element;
