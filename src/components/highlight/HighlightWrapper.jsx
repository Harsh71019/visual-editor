import React, { useEffect, useState } from 'react';

const HighlightWrapper = ({ selectedElementId }) => {
  const [elementRect, setElementRect] = useState(null);

  useEffect(() => {
    const updateRect = () => {
      if (selectedElementId) {
        const selectedElement = document.getElementById(selectedElementId);
        const dropZone = document.getElementById('dropZone');

        if (selectedElement && dropZone) {
          const elementRect = selectedElement.getBoundingClientRect();
          const dropZoneRect = dropZone.getBoundingClientRect();
          setElementRect({
            top: elementRect.top - dropZoneRect.top,
            left: elementRect.left - dropZoneRect.left,
            width: elementRect.width,
            height: elementRect.height,
          });
        }
      }
    };

    updateRect(); // Initial update
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [selectedElementId]);

  return (
    elementRect && (
      <div
        style={{
          position: 'absolute',
          top: elementRect.top,
          left: elementRect.left,
          width: elementRect.width,
          height: elementRect.height,
          border: '2px solid red',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          zIndex: 1000,
        }}
      />
    )
  );
};

export default HighlightWrapper;
