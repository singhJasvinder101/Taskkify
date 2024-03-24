import React, { useState, useEffect } from "react";
import { Box, Center, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import TaskSection from "../components/TaskSection";
import LoadingTask from "../components/LoadingTask";
import LazyLoadHandler from "../components/LazyLoadHandler";
import { DragDropContext } from "react-beautiful-dnd";
import { sampletasks } from "../data/db";
import Navbar from "../components/Navbar";
import FilterOptions from "../components/FilterOptions";

function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify(sampletasks));
      setTasks(sampletasks);
    }
    setLoading(false);
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !result ||
      !destination ||
      source.droppableId === destination.droppableId
    )
      return;
    // console.log(sourceTasks, destinationTasks)

    const updatedTasks = [...tasks];
    const sourceTasks = updatedTasks.filter(
      (task) => task.status === source.droppableId.split("_")[0]
    );
    const destinationTasks = updatedTasks.filter(
      (task) => task.status === destination.droppableId.split("_")[0]
    );

    // destructuring the sourcetasks with movedtask
    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId.split("_")[0];
    destinationTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (taskId, updatedFields) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedFields };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Navbar tasks={tasks} setTasks={setTasks} />
      <FilterOptions tasks={tasks} setTasks={setTasks} />
      <Flex className="container">
        {error.status ? (
          <LazyLoadHandler>
            <Center>
              <div>Error: {error.message}</div>
            </Center>
          </LazyLoadHandler>
        ) : tasks?.length ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Box className="tasks">
              {loading && <div className="loading-overlay"></div>}
              {[
                "Pending",
                "InProgress",
                "Completed",
                "Deployed",
                "Deffered",
              ].map((el, ind) => (
                <LazyLoadHandler suspenceFallback={<LoadingTask />} key={ind}>
                  <TaskSection
                    key={ind}
                    title={el}
                    tasks={tasks.filter((task) => task.status === el)}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                </LazyLoadHandler>
              ))}
            </Box>
          </DragDropContext>
        ) : (
          <Center>
            <VStack>
              <Image
                w="80%"
                src="https://learncab.com/assets/images/no-data-found.png"
              />
              <Heading color="var(--primary-color)" textAlign="center">
                No tasks found.
              </Heading>
            </VStack>
          </Center>
        )}
      </Flex>
    </>
  );
}

export default Board;
