import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import HighlightWrapper from '../highlight/HighlightWrapper';

const DraggableElement = ({ id, type, children, onDragStart }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'editable',
    item: () => {
      onDragStart(id);
      return { id, type };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    padding: '4px',
    margin: '4px 0',
  };

  return React.cloneElement(children, {
    ref: drag,
    style: { ...children.props.style, ...style },
  });
};

const DropZone = ({ json, onReorder }) => {
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);

  const [{ isOver }, drop] = useDrop({
    accept: ['editable', 'button', 'image'],
    drop: (item, monitor) => {
      const dropZone = document.getElementById('dropZone');
      const dropClientOffset = monitor.getClientOffset();
      const dropZoneRect = dropZone.getBoundingClientRect();
      const offsetY = dropClientOffset.y - dropZoneRect.top;

      onReorder(item.id, offsetY, item.type, item.content);
      setSelectedElementId(null); // Clear selected element after drop
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleHover = (id) => {
    setHoveredElement(id);
  };

  const handleLeave = () => {
    setHoveredElement(null);
  };

  const handleElementClick = (id) => {
    setSelectedElementId(id);
  };

  const handleDragStart = (id) => {
    setSelectedElementId(id);
  };

  const updatedJson = { ...json };

  const renderJsonElement = (element) => {
    switch (element.type) {
      case 'div':
        return (
          <div className={element.props.className} style={element.props.style}>
            {element.props.children.map((child, index) => (
              <DraggableElement
                key={index}
                id={child.props.id} // Assuming child.props.id is used to identify elements uniquely
                type={child.type}
                onDragStart={handleDragStart}
              >
                {renderJsonElement(child)}
              </DraggableElement>
            ))}
          </div>
        );
      case 'h1':
        return (
          <h1
            id={element.props.id}
            style={element.props.style}
            onClick={() => handleElementClick(element.props.id)}
            onMouseEnter={() => handleHover(element.props.id)}
            onMouseLeave={handleLeave}
          >
            {element.props.content}
          </h1>
        );
      case 'p':
        return (
          <p
            id={element.props.id}
            style={element.props.style}
            onClick={() => handleElementClick(element.props.id)}
            onMouseEnter={() => handleHover(element.props.id)}
            onMouseLeave={handleLeave}
          >
            {element.props.content}
          </p>
        );
      case 'button':
        return (
          <button
            id={element.props.id}
            style={element.props.style}
            onClick={() => handleElementClick(element.props.id)}
            onMouseEnter={() => handleHover(element.props.id)}
            onMouseLeave={handleLeave}
          >
            {element.props.content}
          </button>
        );
      case 'image':
        return (
          <img
            id={element.props.id}
            src={element.props.src}
            alt='Draggable'
            style={element.props.style}
            onClick={() => handleElementClick(element.props.id)}
            onMouseEnter={() => handleHover(element.props.id)}
            onMouseLeave={handleLeave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      id='dropZone'
      ref={drop}
      style={{
        width: '800px',
        height: '800px',
        border: '1px solid black',
        margin: '20px',
        position: 'relative', // Ensure relative positioning for HighlightWrapper
      }}
    >
      {renderJsonElement(updatedJson)}
      {hoveredElement && (
        <HighlightWrapper selectedElementId={hoveredElement} />
      )}
      {selectedElementId && (
        <HighlightWrapper selectedElementId={selectedElementId} />
      )}
    </div>
  );
};

export default DropZone;
