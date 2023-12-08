import CalenderCard from "@/components/CalenderCard";
import DateScroll from "@/components/DateScroll";
import DetailsCard from "@/components/DetailsCard";
import TodoEditCard from "@/components/EditTaskCard";
import TodoComponent, { TodoProps } from "@/components/TodoComponent";
import { NormalizeDate } from "@/components/helpers/NormalizeDate";
import {
  Box,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import AddTask from "./AddTask";
export interface MainSectionProps {
  openAddCard: boolean;
  closeOpenAddCard: () => void;
}
export default function MainSection({
  openAddCard,
  closeOpenAddCard,
}: MainSectionProps) {
  const date = new Date();
  const todaysDate = date.toDateString();

  const inputString = "Fri Sep 08 2023";

  const formattedDate = NormalizeDate(todaysDate);

  const [inputValue, setInputValue] = useState("");

  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [clickedDate, setClickedDate] = useState<string>(formattedDate);
  const [todo, setTodo] = useState<TodoProps>({} as TodoProps);

  const [openTaskDetails, setOpenTaskDetails] = useState(false);

  const [editButtonClick, setEditButtonClick] = useState(false);

  const handleEditButtonClick = () => {
    setEditButtonClick(true);
    setOpenTaskDetails(false);
  };
  const handleCloseEditClick = () => {
    setEditButtonClick(false);
  };
  const handleOpenCloseDetails = () => {
    setOpenTaskDetails(false);
  };
  const handleOpenTaskDetails = (todo: TodoProps) => {
    setOpenTaskDetails(true);
    setTodo(todo);
    setOpenAddDrawer(false);
    closeOpenAddCard();
    setEditButtonClick(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // setInputValue("");
    setOpenAddDrawer(true);
  };
  const closeAddDrawer = () => {
    setOpenAddDrawer(false);
  };
  const handleDateClick = (clickedDate: string) => {
    setClickedDate(clickedDate);
  };

  return (
    <Box px={{ md: 16, base: 6 }} mt={10}>
      <Grid templateColumns={{ base: "1fr", md: "70% 30%" }} gap={4}>
        <Box borderRight={{ md: "1px solid #ccc", base: "none" }}>
          <DateScroll onDateClick={handleDateClick} />
          <TodoComponent
            clickedDate={clickedDate}
            openTaskDetails={handleOpenTaskDetails}
          />
          <Box mt={4} display={{ md: "none", base: "block" }}>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  _placeholder={{ opacity: 1, color: "black" }}
                  variant="outline"
                  placeholder="Input task"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <FaMicrophone color="blue" />
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        </Box>

        <Box>
          <Box display={{ md: "block", base: "none" }}>
            <Box
              display={
                !editButtonClick &&
                !openAddCard &&
                !openAddDrawer &&
                !openTaskDetails
                  ? "block"
                  : "none"
              }
            >
              <CalenderCard onDateClick={handleDateClick} />
            </Box>
          </Box>

          {openAddCard || openAddDrawer ? (
            <AddTask
              closeAddDrawer={closeAddDrawer}
              openAddDrawer={openAddDrawer}
              onClose={closeOpenAddCard}
              isOpen={openAddCard}
              inputValue={inputValue}
            />
          ) : (
            ""
          )}
          <Box>
            {openTaskDetails && !openAddCard && !openAddDrawer ? (
              <DetailsCard
                handleOpenCloseDetails={handleOpenCloseDetails}
                handleEditButtonClick={handleEditButtonClick}
                todo={todo}
              />
            ) : (
              ""
            )}
          </Box>

          <Box>
            {editButtonClick && !openAddCard && !openAddDrawer ? (
              <TodoEditCard
                handleCloseEditClick={handleCloseEditClick}
                todo={todo}
              />
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
