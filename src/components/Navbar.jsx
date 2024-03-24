import React, { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Select,
  Textarea,
  Input,
} from "@chakra-ui/react";

function Navbar({ tasks, setTasks }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, desc, status, assignee, team, priority } = e.target;
    console.log(e.target)
    const newTask = {
      id: tasks.length + 1,
      title: title.value,
      description: desc.value,
      status: status.value,
      createdAt: new Date().toISOString(),
      assignee: assignee.value,
      team: team.value,
      priority: priority.value,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    e.target.reset();
    onClose();
  };

  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p="10px 15px"
        bgColor="#fff"
        position="sticky"
        top="0"
        left="0"
        zIndex="5"
      >
        <Spacer />
        <Button onClick={onOpen}>
          <HStack>
            <AiOutlinePlus />
            <Text>Add New Task</Text>
          </HStack>
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalBody>
            <form id="create-task-form" onSubmit={handleSubmit}>
              <div className="input-div">
                <label>Task Name</label>
                <Input id="title" type="text" required />
              </div>
              <div className="input-div">
                <label>Description</label>
                <Textarea id="desc" cols="30" rows="3" required></Textarea>
              </div>
              <div className="input-div">
                <label>Team</label>
                <Input id="team" type="text" required />
              </div>
              <div className="input-div">
                <label>Assignee</label>
                <Input
                  placeholder="@John Doe"
                  id="assignee"
                  type="text"
                  required
                />
              </div>
              <div className="input-div">
                <label>Priority</label>
                <Select id="priority" required>
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </Select>
              </div>
              <div className="input-div">
                <label>Current Status</label>
                <Select id="status" required>
                  <option value="Pending">Pending</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Deffered">Deffered</option>
                </Select>
              </div>
              <Button type="submit" isLoading={false}>
                Create Task
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbar;
