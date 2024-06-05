import React, { useState, useEffect } from 'react';
import Toolbar from '../toolbar/Toolbar';
import Canvas from '../canvas/Canvas';

function Editor() {
  const [elements, setElements] = useState(() => {
    const savedElements = localStorage.getItem('elements');
    return savedElements ? JSON.parse(savedElements) : [];
  });

  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements));
  }, [elements]);

  const addElement = (element) => {
    setElements([
      ...elements,
      { ...element, x: 0, y: 0, width: 150, height: 150 },
    ]);
  };

  const updateElement = (index, newProperties) => {
    const updatedElements = elements.map((el, idx) =>
      idx === index ? { ...el, ...newProperties } : el
    );
    setElements(updatedElements);
  };

  return (
    <div>
      <Toolbar addElement={addElement} />
      <Canvas elements={elements} updateElement={updateElement} />
    </div>
  );
}

export default Editor;
