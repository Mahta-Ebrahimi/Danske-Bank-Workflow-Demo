import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useApp } from "../context/AppContext";

const columns = ["Pending", "In Progress", "Completed"];

function KanbanBoard() {
  const { tasks, setTasks } = useApp();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const destStatus = columns[result.destination.droppableId];
    setTasks(tasks.map(t => String(t.id) === result.draggableId ? { ...t, status: destStatus } : t));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col, index) => (
          <Droppable droppableId={String(index)} key={col}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="bg-powder p-4 rounded">
                <h2 className="font-bold text-prussian mb-2">{col}</h2>
                {tasks.filter(t => t.status === col).map((task, i) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={i}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        className="bg-white p-2 mb-2 rounded shadow">
                        <p>{task.title}</p>
                        <small className="text-gray-600">{task.suggestion}</small>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
export default KanbanBoard;
