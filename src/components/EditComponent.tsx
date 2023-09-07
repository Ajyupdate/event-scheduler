import {
    Box,
    Flex,
    HStack,
    Heading,
    Icon,
    Input,
    
    Text,
    Textarea,
    useToast,
  } from "@chakra-ui/react";
  import Image from "next/image";
  import { useState } from "react";
  import "react-calendar/dist/Calendar.css";
  import { FaTimes } from "react-icons/fa";
  // import BellIcon from "../../public/bell.svg";
  import { Spinner } from '@chakra-ui/react'
  import { BellIcon } from "@chakra-ui/icons";
  import axios from "axios";
  
  import Calendar from "react-calendar";
  import CalenderIcon from "../../public/black-calender-icon.svg";
import { TodoProps } from "./TodoComponent";
import { useRouter } from "next/navigation";
  
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  
  export interface ITodoEditCardProps {
    todo: TodoProps,
    handleCloseEditClick: () => void
    // onClose: () => void;
    // onSave: (editedTask: any) => void;
    // completed: boolean;
  }
  
  type ValuePiece = Date | null;
  
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  
  function EditComponent({
    handleCloseEditClick,
    todo,
    // onClose,
    // onSave,
    // completed,
  }: ITodoEditCardProps) {
    const toast = useToast()
    const router = useRouter()
    const [editedTask, setEditedTask] = useState(todo.title);
    const [value, onChange] = useState<Value>(new Date());
    const [loading, setLoading] = useState(false)
    const todoId = todo._id;
  const [startTime, setStartTime] = useState(todo.startTime);
    const [endTime, setEndTime] = useState(todo.endTime);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [preAlert, setPreAlert] = useState(true);
    
  
  
    
  
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setStartTime(e.target.value);
      const inputValue = e.target.value;
      const date = new Date(`2023-09-04 ${inputValue}`);
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      // Format the time in 24-hour format
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setStartTime(formattedTime);
    };
  
    const EditedTaskObject = {
      title: editedTask,
      date: value,
      startTime: startTime,
      endTime: endTime,
      completed: todo.completed,
    };
  
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setEndTime(e.target.value);
  
      const inputValue = e.target.value;
      const date = new Date(`2023-09-04 ${inputValue}`);
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      // Format the time in 24-hour format
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setEndTime(formattedTime);
    };
  
    const formatShortWeekday = (locale: string | undefined, date: Date) => {
      const options = { weekday: "short" as "short" };
      return new Intl.DateTimeFormat(locale, options)
        .format(date)
  
        .slice(0, 2)
        .toLowerCase();
    };
  
    const toggleCalendar = () => {
      setCalendarOpen(!calendarOpen);
    };
    console.log(EditedTaskObject.date);
  
    const handleSave = () => {
      setLoading(true)
      axios
        .patch(`${API_ENDPOINT}/todos/${todo._id}`, EditedTaskObject)
        .then((response) => {
          window.location.reload();
          setLoading(false)
          toast({
            title: 'Success.',
            description: "Task Edited successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          
          
        //   onClose();
        //   onSave(editedTask);
        })
        .catch((error) => {
          setLoading(false)
          toast({
            title: 'Error.',
            description: "Error Adding task. please check your internet connection and try again",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        });
    };
    return (
      <Box
        maxWidth="400px"
        width="100%"
        borderWidth={{ md: "1px", base: "none" }}
        borderRadius={{ md: "lg", base: "unset" }}
        boxShadow={{ md: "md", base: "none" }}
        p={4}
        bg="white"
        position="relative"
        >
           

        <Flex justify={"space-between"} display={{md: 'flex', base: 'none'}}>
          <Heading fontSize={"18px"} fontWeight={600}>
            Edit Task
          </Heading>
  
          <Box>
            <Icon
              as={FaTimes}
              color="gray.500"
              cursor="pointer"
             onClick={handleCloseEditClick}
            />
          </Box>
        </Flex>
  
        <Textarea
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          rows={4}
          placeholder="Edit your task..."
          mt={4}
          bg={"#F7FAFC"}
        />
        {/* <Input
            value={`${(todo.id % 12) + 1} - ${(todo.id % 12) + 2}`}
            placeholder="Time"
            mt={4}
          /> */}
  
        <Flex justify={"space-between"} mt={4}>
          <Box>
            <button
              onClick={toggleCalendar}
              className="p-1 w-auto bg-white hover:bg-dark-200 text-dark-500 hover:text-dark font-50 py-2  
                border border-grey-500 rounded"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              <HStack fontSize={"xs"} height={4}>
                <Image src={CalenderIcon} alt="calender" /> <Text>Today</Text>
              </HStack>
            </button>
          </Box>
  
          <Box ml={4}>
            <Flex>
              <Box>
                <Input
                  size="sm"
                  placeholder=""
                  type="time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </Box>
  
              <Box ml={2}>
                <Input
                  size={"sm"}
                  type="time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
  
        {calendarOpen && (
          <Calendar
            onChange={onChange}
            value={value}
            formatShortWeekday={formatShortWeekday}
          />
        )}
  
        <Flex
          display={preAlert ? "flex" : "none"}
          justify={"space-between"}
          mt={6}>
          <Box>
            <Flex>
              <BellIcon boxSize={6} />
              <Text>10 Minutes before</Text>
            </Flex>
          </Box>
          <Box>
            {" "}
            <Icon
              as={FaTimes}
              color="gray.500"
              cursor="pointer"
              onClick={() => setPreAlert(false)}
            />
          </Box>
        </Flex>
  
        <Flex mt={8}>
          <button className="flex-1 bg-white hover:bg-dark-200 text-dark-500 hover:text-dark font-600 py-2 px-4 border border-grey-500 rounded">
            Cancel
          </button>
  
          <button
            onClick={handleSave}
            className="ml-3 flex-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            {loading ?<Spinner/> : 'Save'}
          </button>
  
          {/* <Input placeholder="" size="md" type="date" /> */}
        </Flex>
      </Box>
    );
  }
  
  export default EditComponent;
  