import { useContext, useState } from "react";
import { EditContext } from "../contexts/edit-context";

export const EditProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <EditContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
