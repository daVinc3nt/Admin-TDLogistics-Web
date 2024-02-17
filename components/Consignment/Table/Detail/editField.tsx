// EditField.tsx
import React, { useState, useEffect, useRef } from "react";


interface EditFieldProps {
  data: string | number;
  handleEdit: (value: string | number) => void;
  type: string;
  isEditing: boolean; // New prop to handle editing mode
}

const EditableField: React.FC<EditFieldProps> = ({ data, handleEdit, type, isEditing }) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData(e.target.value);
  };

  const handleEditComplete = () => {
    handleEdit(editedData);
  };

  const inputWidth = type === 'number' ? 'w-[70px]' : 'w-[200px] pr-5';

  return (
    <div>
      {isEditing ? ( // Render input field if in editing mode
        <input
          className={`bg-transparent outline-none border-b-2 border-[#545e7b] text-white ${inputWidth}`}
          type={type}
          value={editedData}
          onChange={handleInputChange}
          onBlur={handleEditComplete}
        />
      ) : (
        <span className={`${
          typeof data === 'string' && data.length === 0
            ? 'pr-[200px] border-b-2 border-red-500' 
            : 'pr-10'}`}>{data}</span>
      )}
    </div>
  );
};

export default EditableField;
