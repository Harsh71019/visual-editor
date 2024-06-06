import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['button', 'image'],
    drop: (item) => {
      const dropZone = document.getElementById('dropZone');
      let element;

      if (item.type === 'button') {
        element = document.createElement('button');
        element.innerText = item.name;
      } else if (item.type === 'image') {
        element = document.createElement('img');
        element.src = item.src;
        element.alt = 'Dropped Image';
        element.style.width = '150px';
        element.style.height = '150px';
      }

      if (element) {
        element.id = item.id;
        dropZone.appendChild(element);
        onDrop(item);
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
