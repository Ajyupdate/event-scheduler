import "react-calendar/dist/Calendar.css";
// import BellIcon from "../../public/bell.svg";


import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditComponent from "./EditComponent";
import { TodoProps } from "./TodoComponent";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export interface ITodoEditCardProps {
  todo: TodoProps;
  handleCloseEditClick: () => void
//   onClose: () => void;
//   onSave: (editedTask: any) => void;
//   completed: boolean;
}

function TodoEditCard({
  todo,
  handleCloseEditClick
//   onClose,
//   onSave,
//   completed,
}: ITodoEditCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = window.innerWidth <= 800; // Adjust the screen width threshold as needed

  useEffect(() => {
    if (isSmallScreen) {
      setIsOpen(true); // Automatically close the drawer on small screens
    }
  }, [isSmallScreen]);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Box>
      <Box display={{ md: "block", base: "none" }}>
        <EditComponent
          todo={todo}
          handleCloseEditClick={handleCloseEditClick}
        //   onClose={onClose}
        //   onSave={onSave}
        //   completed={completed}
        />
      </Box>

      <Box display={{ md: "none", base: "block" }}>
        {/* This will display the Drawer on smaller screens */}
        <Drawer
          size="full"
          isOpen={isOpen}
          placement="right"
          onClose={handleClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Edit Task</DrawerHeader>
              <DrawerBody>
                <EditComponent
                  todo={todo}
                  handleCloseEditClick={handleCloseEditClick}
                //   onClose={onClose}
                //   onSave={onSave}
                //   completed={completed}
                />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Box>
  );
}

export default TodoEditCard;
