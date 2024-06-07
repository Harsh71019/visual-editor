import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragButton = ({ id, initialContent }) => {
  const [content, setContent] = useState(initialContent); // Use state for content

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'button',
    item: { id, type: 'button', content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <button ref={drag} style={style}>
      {content}
    </button>
  );
};

export default DragButton;
