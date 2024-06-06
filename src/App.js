import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragButton from './components/button/dragbutton.jsx';
import DropZone from './components/dropzone/dropzone.jsx';
import DomTree from './components/domtree/domtree.jsx';
import DragImage from './components/image/image.jsx';
import './App.css';

function App() {
  const [nodes, setNodes] = useState([{ id: 'root', children: [] }]);

  const updateNodes = (id, newName) => {
    setNodes((prevNodes) => {
      const newNodes = JSON.parse(JSON.stringify(prevNodes));
      const rootNode = newNodes[0];
      rootNode.children.push({ id, name: newName, children: [] });
      return newNodes;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <div className='left'>
          <DropZone onDrop={updateNodes} />
          <DragButton />
          <DragImage />
        </div>
        <div className='right'>
          <DomTree nodes={nodes} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
