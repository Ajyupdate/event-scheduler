// components/DrawerComponent.js

import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    Flex,
    HStack,
    Icon,
    Input,
    Text,
    Textarea,
  } from "@chakra-ui/react";
  import Image from "next/image";
  import { useToast } from '@chakra-ui/react'
  import { useState } from "react";
  import { Spinner } from '@chakra-ui/react'
  import { BellIcon } from "@chakra-ui/icons";
  import Calendar from "react-calendar";
  import { FaTimes } from "react-icons/fa";
  import CalenderIcon from "../../public/black-calender-icon.svg";
import axios from "axios";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  type ValuePiece = Date | null;
  
  export interface TaskDrawerprops {
    isOpen: boolean;
    onClose: () => void;
    closeAddDrawer: () => void
    inputValue: string
  }
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const AddNewComponent = ({
    isOpen,
    onClose,
    closeAddDrawer,
    inputValue
  }: TaskDrawerprops) => {
    const toast = useToast()
    const [task, setTask] = useState(inputValue);
    console.log(task)
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [startTime, setStartTime] = useState("12:30");
    const [endTime, setEndTime] = useState("13:30");
    const [value, onChange] = useState<Value>(new Date());
    const [preAlert, setPreAlert] = useState(true);
    const [loading, setLoading] = useState(false)
    const toggleCalendar = () => {
      setCalendarOpen(!calendarOpen);
    };
  
    const formatShortWeekday = (locale: string | undefined, date: Date) => {
      const options = { weekday: "short" as "short" };
      return new Intl.DateTimeFormat(locale, options)
        .format(date)
  
        .slice(0, 2)
        .toLowerCase();
    };
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

    const newTodoData = {
      title: task,
      date: value,
      startTime: startTime,
      endTime: endTime,
      completed: false
    }

    const handleSave = () =>{
      setLoading(true)
     axios.post(`${API_ENDPOINT}/todos`, newTodoData)
     .then(response => {
       setLoading(false)
       window.location.reload();
       toast({
        title: 'Success.',
        description: "Task added successfully.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
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
     })
    }
    const handleAddFormCancel = () =>{
      closeAddDrawer()
      onClose()
    }
  
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
           <Flex display={{md: 'flex', base: 'none'}} justify={"space-between"}>
        <Heading fontSize={"18px"} fontWeight={600}>
          Add Task
        </Heading>

        <Box>
          <Icon
            as={FaTimes}
            color="gray.500"
            cursor="pointer"
            onClick={onClose}
          />
        </Box>
      </Flex>
      
              <Textarea
                variant="outline"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                rows={4}
                mt={4}
                style={{
                  backgroundColor: "#F7FAFC", // Background color
                  // border: "1px solid gray", // Border
                  borderRadius: "8px", // Border radius
                }}
              />
  
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
                      <Image src={CalenderIcon} alt="calender" />{" "}
                      <Text>Today</Text>
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
                <button onClick={ handleAddFormCancel} className="flex-1 bg-white hover:bg-dark-200 text-dark-500 hover:text-dark font-600 py-2 px-4 border border-grey-500 rounded-lg">
                  Cancel
                </button>
  
                <button
                   onClick={handleSave}
                  className="ml-3 flex-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                  {loading ?<Spinner/> : 'Add'}
                </button>
  
                {/* <Input placeholder="" size="md" type="date" /> */}
              </Flex>

           </Box>   
            
    );
  };
  
  export default AddNewComponent;
  