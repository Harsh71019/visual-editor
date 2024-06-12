import React from 'react';
import { useDrag } from 'react-dnd';

const DragButton = ({ id, content }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'button',
    item: { id, type: 'button', content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <button ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {content || 'Drag me'}
    </button>
  );
};

export default DragButton;
