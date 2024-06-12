import React from 'react';
import { useDrag } from 'react-dnd';

const DragImage = ({ id, src }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { id, type: 'image', src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={src || 'https://via.placeholder.com/150'}
      alt='Draggable'
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />
  );
};

export default DragImage;
