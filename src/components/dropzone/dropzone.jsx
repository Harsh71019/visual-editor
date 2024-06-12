import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const DraggableElement = ({ id, type, children, isDragging }) => {
  const [{ isDrag }, drag] = useDrag(() => ({
    type: 'editable',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    border: isDragging ? '2px solid blue' : '1px dashed gray',
    padding: '4px',
    margin: '4px 0',
  };

  return <>{React.cloneElement(children, { ref: drag, style })}</>;
};

const renderElement = (element, onHover, onLeave) => {
  switch (element.type) {
    case 'div':
      return (
        <div className={element.props.className} style={element.props.style}>
          {element.props.children.map((child, index) => (
            <DraggableElement
              key={index}
              id={child.id}
              type={child.type}
              isDragging={child.isDragging}
              onMouseEnter={() => onHover(child.id)}
              onMouseLeave={() => onLeave(child.id)}
            >
              {renderElement(child, onHover, onLeave)}
            </DraggableElement>
          ))}
        </div>
      );
    case 'h1':
      return <h1 style={element.props.style}>{element.props.content}</h1>;
    case 'p':
      return <p style={element.props.style}>{element.props.content}</p>;
    case 'button':
      return (
        <button style={element.props.style}>{element.props.content}</button>
      );
    case 'image':
      return (
        <img
          src={element.props.src}
          alt='Draggable'
          style={element.props.style}
        />
      );
    default:
      return null;
  }
};

const DropZone = ({ json, onReorder }) => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const [{ isOver }, drop] = useDrop({
    accept: ['editable', 'button', 'image'],
    drop: (item, monitor) => {
      const dropZone = document.getElementById('dropZone');
      const dropClientOffset = monitor.getClientOffset();
      const dropZoneRect = dropZone.getBoundingClientRect();
      const offsetY = dropClientOffset.y - dropZoneRect.top;

      onReorder(item.id, offsetY, item.type, item.content);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleHover = (id) => {
    setHoveredElement(id);
  };

  const handleLeave = (id) => {
    if (hoveredElement === id) {
      setHoveredElement(null);
    }
  };

  const updatedJson = { ...json };
  updatedJson.props.children[0].props.children =
    updatedJson.props.children[0].props.children.map((child) => ({
      ...child,
      isDragging: hoveredElement === child.id,
    }));

  return (
    <div
      id='dropZone'
      ref={drop}
      style={{
        width: '900px',
        height: '900px',
        border: '1px solid black',
        margin: '20px',
      }}
    >
      {renderElement(updatedJson, handleHover, handleLeave)}
    </div>
  );
};

export default DropZone;
