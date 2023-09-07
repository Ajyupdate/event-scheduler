


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
import DetailsCardComponent from "./DetailsCardComponent";
import { TodoProps } from "./TodoComponent";

export interface DetailsCardProps {
  todo: IDetailsCardprops ;
  // onEditClick: any;
  // handleTodoClick: (todo: TodoProps) => void;
  handleEditButtonClick: () => void;
  handleOpenCloseDetails: () => void
}
export interface IDetailsCardprops {
  title: string;
  _id: number;
  startTime: string;
  endTime: string;
  date: string;
}
function DetailsCard({ todo, handleEditButtonClick,  handleOpenCloseDetails }: DetailsCardProps) {
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
        {/* This will display the DetailsCardComponent on larger screens */}
        <DetailsCardComponent todo={todo}  handleOpenCloseDetails={ handleOpenCloseDetails} onEditClick={handleEditButtonClick} />
      </Box>
      <Box display={{ md: "none", base: "block" }}>
        {/* This will display the Drawer on smaller screens */}
        <Drawer
          size="full"
          isOpen={isOpen}
          placement="right"
          onClose={ handleOpenCloseDetails}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader></DrawerHeader>
              <DrawerBody>
                <DetailsCardComponent todo={todo}  handleOpenCloseDetails={ handleOpenCloseDetails} onEditClick={handleEditButtonClick} />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Box>
  );
}
export default DetailsCard;
