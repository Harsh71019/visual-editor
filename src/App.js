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

    // Check if the dragged item is from the sidebar (type 'button' or 'image')
    if (type === 'button' || type === 'image') {
      // Generate a unique ID for the new element
      const newId = generateUniqueId(type);

      // Create a new element based on the type
      const newElement =
        type === 'button'
          ? {
              type: 'button',
              props: {
                id: newId,
                content: content || 'New Button',
                csEditable: true,
              },
            }
          : {
              type: 'image',
              props: {
                id: newId,
                src: src || 'https://via.placeholder.com/150',
                csEditable: true,
              },
            };

      // Calculate the insert index based on offsetY
      let insertIndex = elements.findIndex((el) => {
        const elDom = document.getElementById(el.props.id);
        if (elDom) {
          const elRect = elDom.getBoundingClientRect();
          return offsetY < elRect.top;
        }
        return false;
      });

      // If insertIndex is -1, the new element should be at the end
      if (insertIndex === -1) {
        elements.push(newElement);
      } else {
        elements.splice(insertIndex, 0, newElement);
      }
    } else {
      // Find the index of the moved element
      const index = elements.findIndex((el) => el.props.id === id);
      if (index === -1) return; // Return if element not found

      // Remove the moved element from the array
      const [movedElement] = elements.splice(index, 1);

      // Calculate the insert index based on offsetY
      let insertIndex = elements.findIndex((el) => {
        const elDom = document.getElementById(el.props.id);
        if (elDom) {
          const elRect = elDom.getBoundingClientRect();
          return offsetY < elRect.top;
        }
        return false;
      });

      // If insertIndex is -1, the moved element should be at the end
      if (insertIndex === -1) {
        elements.push(movedElement);
      } else {
        elements.splice(insertIndex, 0, movedElement);
      }
    }

    // Update state with the new JSON structure
    setJson(newJson);
  };

  const handleChange = (id, newText) => {
    const newJson = { ...json };
    const elements = newJson.props.children[0].props.children;

    // Find the element by ID and update its content
    const element = elements.find((el) => el.props.id === id);
    if (element) {
      element.props.content = newText;
      setJson(newJson); // Update state with the modified JSON structure
    }
  };

  const generateUniqueId = (prefix) => {
    return `${prefix}-${Date.now()}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='d-flex container'>
        {/* Sidebar with draggable elements */}
        <div className='col-2'>
          <h2>Drag Elements</h2>
          {/* DragButton component */}
          <DragButton
            id={generateUniqueId('button')}
            initialContent='New button'
            onDrop={(content) => reorderElements(null, null, 'button', content)}
          />
          {/* DragImage component */}
          <DragImage
            id={generateUniqueId('image')}
            onDrop={(src) => reorderElements(null, null, 'image', null, src)}
          />
        </div>

        {/* Main content area with DropZone */}
        <div className='col-8'>
          <DropZone
            json={json}
            onReorder={reorderElements}
            onChange={handleChange}
          />
        </div>

        {/* Sidebar with DOM Tree */}
        <div className='col-2'>
          <DomTree nodes={json.props.children} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
