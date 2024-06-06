import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragButton = () => {
  const [name, setName] = useState('Drag me');

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'button',
    item: { id: `button-${Date.now()}`, type: 'button', name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <input
      type='text'
      value={name}
      ref={drag}
      onChange={handleChange}
      style={{
        padding: '10px',
        margin: '20px',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
};

export default DragButton;
