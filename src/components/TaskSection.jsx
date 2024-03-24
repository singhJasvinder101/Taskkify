import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

function TaskSection({ title, tasks, updateTask, deleteTask }) {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const getFilteredTasks = () => {
      setFilteredTasks(tasks.filter((task) => task.status === title));
    };
    getFilteredTasks();
  }, [title, tasks]);

  return (
    <Droppable droppableId={`${title}_section`}>
      {(provided, snapshot) => (
        <Box
          className={`task-section ${snapshot.isDraggingOver && "task-dragging-over"}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Text className="subHeading-text" data-title={title}>
            {title} ({filteredTasks.length})
          </Text>
          {filteredTasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}

export default TaskSection;
