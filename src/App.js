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

  const reorderElements = (id, offsetY, type, content) => {
    const newJson = { ...json };
    const elements = newJson.props.children[0].props.children;

    const index = elements.findIndex((el) => el.id === id);
    const [movedElement] = elements.splice(index, 1);

    let insertIndex = elements.findIndex((el) => {
      const elDom = document.getElementById(el.id);
      if (elDom) {
        const elRect = elDom.getBoundingClientRect();
        return offsetY < elRect.top;
      }
      return false;
    });

    if (insertIndex === -1) {
      elements.push(movedElement);
    } else {
      elements.splice(insertIndex, 0, movedElement);
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Drag Elements</h2>
        <DragButton id='dragButton1' content='New Button' />
        <DragImage id='dragImage1' />
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
