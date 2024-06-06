import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['button', 'image'],
    drop: (item, monitor) => {
      const button = document.getElementById(item.id);
      if (button) {
        const dropZone = document.getElementById('dropZone');
        dropZone.appendChild(button);
        onDrop(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      id='dropZone'
      ref={drop}
      style={{
        width: '500px',
        height: '700px',
        border: '1px solid black',
        margin: '20px',
        backgroundColor: isOver ? 'lightgreen' : 'white',
      }}
    ></div>
  );
};

export default DropZone;
