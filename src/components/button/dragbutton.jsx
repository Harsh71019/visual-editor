// DragButton.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DragButton = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'button',
    item: { id: 'dragButton' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      id='dragButton'
      ref={drag}
      style={{
        padding: '10px',
        margin: '20px',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      Drag me
    </button>
  );
};

export default DragButton;
