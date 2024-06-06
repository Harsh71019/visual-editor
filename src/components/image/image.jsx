import React from 'react';
import { useDrag } from 'react-dnd';

const DragImage = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: {
      id: `image-${Date.now()}`,
      type: 'image',
      src: 'https://via.placeholder.com/150',
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      id='imageDrag'
      ref={drag}
      style={{
        width: '150px',
        height: '150px',
        backgroundImage: 'url(https://via.placeholder.com/150)',
        backgroundSize: 'cover',
        cursor: 'grab',
        margin: '20px',
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
};

export default DragImage;
