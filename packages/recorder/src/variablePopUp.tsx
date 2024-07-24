import React, { useState } from 'react';
import { VariablePopupProps } from './types'; 

export const VariablePopup: React.FC<VariablePopupProps> = ({ onClose, onSave }) => {
  const [variableName, setVariableName] = useState('');

  const handleSave = () => {
    if (variableName) {
      onSave(variableName);
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Add New Variable</h3>
        <input
          type="text"
          placeholder="Variable name"
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
