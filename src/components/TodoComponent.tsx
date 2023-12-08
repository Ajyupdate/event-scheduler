import { Box, Checkbox, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { convertTo12HourFormat } from "./helpers/FormatTime";
import { NormalizeDate } from "./helpers/NormalizeDate";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export interface TodoProps {
  status: string;
  userId: number;
  _id: number;
  title: string;
  completed: boolean;
  startTime: string;
  endTime: string;
  date: string;
}
export interface data {
  status: string;
  data: TodoProps;
}
const PAGE_SIZE = 5;
// const TOTAL_TODOS = 100;

export interface TodoComponentProps {
  openTaskDetails: (todo: TodoProps) => void;
  clickedDate: string;
}
export default function TodoComponent({
  openTaskDetails,
  clickedDate,
}: TodoComponentProps) {
  const toast = useToast();
  const router = useRouter();
  const date = new Date();
  const todaysDate = date.toDateString();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // State to control the edit card
  const [selectedTodo, setSelectedTodo] = useState<TodoProps | null>(null); // State to store the selected todo
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleTodoClick = (todo: TodoProps) => {
    openTaskDetails(todo);

    setSelectedTodo(todo);
    setIsDetailsOpen(true);
    setSelectedTodoId(todo._id);
  };

  useEffect(() => {
    if (clickedDate) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (!id) {
        router.push("/auth/sign-in");
      }
      axios

        .get(`${API_ENDPOINT}/tasks/${id}?date=${clickedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTodos(response.data);

          toast({
            title: "Success",
            description: response.data.message,
            status: "success",
            duration: 900,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: error.response.data.status,
            description: error.response.data.message,
            status: "error",
            duration: 500,
            isClosable: true,
          });
          router.push("/auth/sign-in");
        });
    }
  }, [clickedDate]);

  const paginatedTodos = todos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleTodoCompletion = (todoId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo._id === todoId) {
          const updatedTodo = {
            ...todo,
            completed: !todo.completed,
          };

          axios
            .patch(`${API_ENDPOINT}/todos/${todoId}`, updatedTodo)
            .then((response) => {
              console.log("Updated todo on the server:");
            })
            .catch((error) => {
              console.error("Error updating todo:");
            });

          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const totalPages = Math.ceil(todos.length / PAGE_SIZE);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box p={4}>
      <Text textAlign="left" fontSize="16px" fontWeight="700" mb="2">
        My Task
      </Text>

      <Box>
        {paginatedTodos.map((todo) => (
          <Flex
            onClick={() => handleTodoClick(todo)}
            bg={selectedTodoId === todo._id ? "gray.200" : "#F9FAFB"}
            _active={{
              bg: "gray.200",
            }}
            _hover={{
              bg: "gray.200",
            }}
            justify={"space-between"}
            p={4}
            my={4}
            // boxShadow="md"
            key={todo._id}
            // alignItems="center"
            justifyContent="space-between"
            marginBottom="4px"
          >
            <Flex alignItems="center">
              <Checkbox
                isChecked={todo.completed}
                onChange={() => toggleTodoCompletion(todo._id)}
              />
              <Box marginLeft="16px">
                <Text
                  textDecoration={todo.completed ? "line-through" : "none"}
                  color={todo.completed ? "gray.500" : "inherit"}
                >
                  {todo.title}
                </Text>
                <Text
                  textDecoration={todo.completed ? "line-through" : "none"}
                  fontSize="sm"
                  color="gray.500"
                >
                  {`${convertTo12HourFormat(
                    todo.startTime
                  )} - ${convertTo12HourFormat(todo.endTime)}`}
                </Text>
              </Box>
            </Flex>
            <Flex textAlign="right">
              <Text color={"gray.600"}>
                {NormalizeDate(todaysDate) === todo.date ? "Today" : todo.date}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>

      <Box
        mt={4}
        display={{ md: "flex", base: "flex" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <HStack>
            <AiOutlineArrowLeft
              size={12}
              cursor="pointer"
              onClick={goToPreviousPage}
            />
            <Text cursor={"pointer"} onClick={goToPreviousPage}>
              Previous
            </Text>
          </HStack>
        </Box>

        <Box display="flex" justifyContent="center">
          {Array.from(Array(totalPages).keys()).map((page) => (
            <Box
              key={page}
              cursor="pointer"
              p={2}
              color={currentPage === page + 1 ? "blue.500" : "inherit"}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </Box>
          ))}
        </Box>

        <Box>
          <HStack>
            <Text cursor={"pointer"} onClick={goToNextPage}>
              Next
            </Text>
            <AiOutlineArrowRight
              size={12}
              cursor="pointer s"
              onClick={goToNextPage}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
