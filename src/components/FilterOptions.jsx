import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Heading,
} from "@chakra-ui/react";

const FilterOptions = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState({
    assignee: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleFilterSubmit = () => {
    let filteredTasks = tasks?.filter((task) => {
      if (filter.assignee && task.assignee !== filter.assignee) {
        return false;
      }
      if (filter.startDate && task.startDate < filter.startDate) {
        return false;
      }
      if (filter.endDate && task.endDate > filter.endDate) {
        return false;
      }
      if (filter.priority && task.priority !== filter.priority) {
        return false;
      }
      return true;
    });

    setTasks(filteredTasks);
  };

  const handleResetFilters = () => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
    setFilter({
      assignee: "",
      startDate: "",
      endDate: "",
      priority: "",
    });
  };

  return (
    <div className="filter-container">
      <Heading display={{ base: "none", sm: "inline-block" }} size="md">
        Filter Options
      </Heading>
      <Flex gap={6} className="container">
        <FormControl>
          <FormLabel>Assignee:</FormLabel>
          <Input
            type="text"
            name="assignee"
            value={filter.assignee}
            onChange={handleFilterChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Start Date:</FormLabel>
          <Input
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleFilterChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date:</FormLabel>
          <Input
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleFilterChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Priority:</FormLabel>
          <Select
            name="priority"
            value={filter.priority}
            onChange={handleFilterChange}
          >
            <option value="">Select Priority</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </Select>
        </FormControl>
      </Flex>
      <Button onClick={handleFilterSubmit} colorScheme="blue" mt={4}>
        Apply Filters
      </Button>
      <Button
        isDisabled={
          filter?.assignee?.length === 0 
          && filter?.startDate?.length === 0
          && filter?.endDate?.length === 0
          && filter?.priority?.length === 0
        }
        onClick={handleResetFilters}
        colorScheme="gray"
        mt={4}
        ml={4}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterOptions;
