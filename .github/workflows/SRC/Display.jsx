import React from 'react';
import "./Display.css";

const Display = ({ array }) => {
  const max = Math.max(...array); 
  return (
    <div className="dis-container">
      {array.map((e, index) => (
        <div
          key={index}
          className="dis-bar"
          style={{
            height: `${(e / max) * 100}%`, 
          }}
        ></div>
      ))}
    </div>
  );
};

export default Display
