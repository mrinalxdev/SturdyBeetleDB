import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column } from "../types";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);

  const createColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 100001);
  };
  return (
    <div className="m-auto flex items-center w-full overflow-x-auto overflow-y-hidden px-[100px] min-h-screen">
      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer column={col} />
          ))}
        </div>
        <button
          onClick={createColumn}
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer ease-in-out duration-150 rounded-lg bg-[#5C5470] p-4 hover:bg-[#B9B4C7] hover:text-[#5C5470] flex items-center gap-4"
        >
          <PlusIcon /> Add Column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
