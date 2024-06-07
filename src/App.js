import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './components/dropzone/dropzone.jsx';
import DomTree from './components/domtree/domtree.jsx';
import DragButton from './components/button/dragbutton.jsx';
import DragImage from './components/image/image.jsx';
import './App.css';

const initialJson = {
  type: 'div',
  props: {
    className: 'hero-image',
    children: [
      {
        type: 'div',
        props: {
          className: 'hero-text',
          children: [
            {
              type: 'h1',
              props: {
                id: '1',
                style: { fontSize: '50px' },
                content: 'I am John Doe',
                csEditable: true,
              },
            },
            {
              type: 'p',
              props: {
                id: '2',
                content: "And I'm a Photographer",
                csEditable: true,
              },
            },
            {
              type: 'button',
              props: {
                id: '3',
                content: 'Hire me',
                csEditable: true,
              },
            },
          ],
        },
      },
    ],
  },
};

function App() {
  const [json, setJson] = useState(initialJson);

  const reorderElements = (id, offsetY, type, content, src) => {
    const newJson = { ...json };
    const elements = newJson.props.children[0].props.children;

    // Find the index of the moved element
    const index = elements.findIndex((el) => el.id === id);
    const [movedElement] = elements.splice(index, 1);

    // Find the index where the moved element should be inserted
    let insertIndex = elements.findIndex((el) => {
      const elDom = document.getElementById(el.id);
      if (elDom) {
        const elRect = elDom.getBoundingClientRect();
        return offsetY < elRect.top;
      }
      return false;
    });

    let newElement;
    if (type === 'button') {
      // Check if the button is already present
      const existingButtonIndex = elements.findIndex(
        (el) => el.type === 'button'
      );
      if (existingButtonIndex !== -1) {
        elements.splice(existingButtonIndex, 1); // Remove existing button
        insertIndex -= 1; // Adjust insertIndex if removing an existing button
      }
      // Generate a unique ID for the button
      const buttonId = `button-${Date.now()}`;
      newElement = {
        type: 'button',
        props: {
          id: buttonId,
          content: content || 'New Button',
          csEditable: true,
        },
      };
    } else if (type === 'image') {
      // Check if the image is already present
      const existingImageIndex = elements.findIndex(
        (el) => el.type === 'image'
      );
      if (existingImageIndex !== -1) {
        elements.splice(existingImageIndex, 1); // Remove existing image
        insertIndex -= 1; // Adjust insertIndex if removing an existing image
      }
      // Generate a unique ID for the image
      const imageId = `image-${Date.now()}`;
      newElement = {
        type: 'image',
        props: {
          id: imageId,
          src: src || 'https://via.placeholder.com/150',
          csEditable: true,
        },
      };
    }

    // Insert the moved element at the new position
    if (insertIndex === -1) {
      elements.push(movedElement);
    } else {
      elements.splice(insertIndex, 0, movedElement);
    }

    // Insert the new element if applicable
    if (newElement) {
      if (insertIndex === -1) {
        elements.push(newElement);
      } else {
        elements.splice(insertIndex, 0, newElement);
      }
    }

    setJson(newJson);
  };

  const handleChange = (id, newText) => {
    const newJson = { ...json };
    const elements = newJson.props.children[0].props.children;

    const element = elements.find((el) => el.id === id);
    if (element) {
      element.props.content = newText;
    }

    setJson(newJson);
  };

  const generateUniqueId = (prefix) => {
    return `${prefix}-${Date.now()}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Drag Elements</h2>
        <DragButton
          id={generateUniqueId('button')}
          initialContent='New button'
        />
        <DragImage id={generateUniqueId('image')} />
      </div>
      <div className='App'>
        <div className='left'>
          <DropZone
            json={json}
            onReorder={reorderElements}
            onChange={handleChange}
          />
        </div>
        <div className='right'>
          <DomTree nodes={json.props.children} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
