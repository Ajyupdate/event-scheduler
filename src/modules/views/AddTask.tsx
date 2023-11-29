
import { Box, Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddNewComponent from '../../components/AddNewTaskComponent';

export interface AddTaskprops {
  isOpen: boolean;
  onClose: () => void;
  openAddDrawer: boolean
  closeAddDrawer: () => void
  inputValue: string
}

const AddTask = ({ isOpen, onClose, openAddDrawer, closeAddDrawer, inputValue }: AddTaskprops) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isSmallScreen = window.innerWidth <= 800; // Adjust the screen width threshold as needed
  
    useEffect(() => {
      if (isSmallScreen) {
        setIsDrawerOpen(true); // Automatically close the drawer on small screens
      }
    }, [isSmallScreen]);

    const closeDrawer = () => {
        closeAddDrawer()
        onClose
    }
  return (
    <Box>
      <Box display={{md: 'block', base: 'none'}}>
        <AddNewComponent
        inputValue={inputValue}
          isOpen={isOpen}
          onClose={onClose}
          closeAddDrawer={ closeAddDrawer}
         
        />
      </Box>{" "}

      <Box display={{md: 'none', base: 'block'}}>
        <Drawer size={"full"} isOpen={openAddDrawer} placement="right" onClose={closeDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add</DrawerHeader>
            <DrawerBody>
                <AddNewComponent inputValue={inputValue} isOpen={isOpen}  closeAddDrawer={ closeAddDrawer}
            onClose={onClose}/>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
        </Drawer>
      </Box>
    </Box>
  );
};

export default AddTask;
