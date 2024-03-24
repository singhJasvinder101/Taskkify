import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Heading,
  useDisclosure,
  Select,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

function getDateAndTime(createdAt) {
  const dateAndTime = new Date(createdAt);
  const [date, time] = dateAndTime
    .toLocaleTimeString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
    .split(", ");
  return { date, time };
}

function Task({ task, index, updateTask, deleteTask }) {
  const {
    id: taskId,
    title,
    description,
    priority,
    team,
    status,
    createdAt,
  } = task;
  const { date, time } = useMemo(() => getDateAndTime(createdAt), [createdAt]);

  const { onOpen, onClose, isOpen } = useDisclosure();

  const editNameRef = useRef();
  const editDescRef = useRef();

  const [editName, setEditName] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  const handleEditName = () => {
    const newTitle = editNameRef.current.value;
    if (newTitle !== title) {
      updateTask(taskId, { title: newTitle });
    }
    setEditName(false);
  };

  const handleEditDesc = () => {
    const newDesc = editDescRef.current.value;
    if (newDesc !== description) {
      updateTask(taskId, { description: newDesc });
    }
    setEditDesc(false);
  };

  const handleTaskStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus !== status) {
      updateTask(taskId, { status: newStatus });
    }
  };

  const handleTaskDelete = () => {
    deleteTask(taskId);
    onClose();
  };

  return (
    <>
      <Draggable draggableId={String(taskId)} index={index}>
        {(provided, snapshot) => (
          <Box
            className={`task ${snapshot.isDragging && "dragging-task"}`}
            onClick={onOpen}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Text className="task-heading" noOfLines={2} cursor="pointer">
              {title}
            </Text>
          </Box>
        )}
      </Draggable>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="edit-subtask">
          <ModalHeader>
            {editName ? (
              <HStack className="task-input">
                <input autoFocus defaultValue={title} ref={editNameRef} />
                <HStack>
                  <BsCheckCircle onClick={handleEditName} />
                  <BsXCircle onClick={() => setEditName(false)} />
                </HStack>
              </HStack>
            ) : (
              <Heading onDoubleClick={() => setEditName(true)}>
                Task: {title}
              </Heading>
            )}
            <HStack>
              <TiEdit onClick={() => setEditName(true)} />
              <MdDelete onClick={handleTaskDelete} />
            </HStack>
          </ModalHeader>
          <ModalBody>
            {editDesc ? (
              <HStack className="task-input">
                <input autoFocus defaultValue={description} ref={editDescRef} />
                <HStack>
                  <BsCheckCircle onClick={handleEditDesc} />
                  <BsXCircle onClick={() => setEditDesc(false)} />
                </HStack>
              </HStack>
            ) : (
              <HStack>
                <Text onDoubleClick={() => setEditDesc(true)}>
                  {description}
                </Text>
                <TiEdit
                  color="var(--primary-edit-color)"
                  onClick={() => setEditDesc(true)}
                />
              </HStack>
            )}
            <HStack style={{ textAlign: "left" }}>
              <Text>Team - {team}</Text>
            </HStack>
            <HStack style={{ textAlign: "left" }}>
              <Text>Priority - {priority}</Text>
            </HStack>

            <div className="input-div">
              <label>Current Status</label>
              <Select onChange={handleTaskStatusChange} value={status}>
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deffered">Deffered</option>
              </Select>
            </div>
            <HStack color="gray.600" fontSize="12px">
              <bdi>Created at:</bdi>
              <Text>
                {date} | 🕖 {time}
              </Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Task;
