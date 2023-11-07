import {
  Alert,
  AlertIcon,
  Box, Flex, HStack, Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import ClockIcon from "../../public/clock-icon.svg";
import CalenderIcon from "./../../public/calender-icon.svg";
import { convertTo12HourFormat } from "./helpers/FormatTime";
import { FormattedDate } from "./helpers/FormattedDate";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onBuy?: () => void;
  isLoading: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete, 
  isLoading
}) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.5)" p={{ base: 4, md: "unset" }} />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this task?</ModalBody>
          <ModalFooter>
            <button
              onClick={onDelete}
              type="button"
              className="rounded-md	 px-2 py-2 text-red-700 bg-red-50 ml-2 font-bold">
               {isLoading ?<Spinner/> : 'Delete'}
            </button>

            <button onClick={onClose} className="ml-3">
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export interface DetailsCardProps {
  todo: IDetailsCardprops ;
  onEditClick: any;
  handleOpenCloseDetails: () => void
}
export interface IDetailsCardprops {
  title: string ;
  _id: number ;
  startTime: string ;
  endTime: string ;
  date: string ;
}
function DetailsCardComponent({ todo, onEditClick,  handleOpenCloseDetails }: DetailsCardProps) {
  const toast = useToast()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number>(todo._id);
  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleDelete = (taskId: number) =>{
    setLoading(true)
   
    if(deleteTaskId){
    axios.delete(`${API_ENDPOINT}/tasks/${deleteTaskId}`)
    .then(response =>{
      setLoading(false)
      setSuccessAlert(true)
      setErrorAlert(false)
      toast({
        title: 'Success.',
        description: "Task added successfully.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      window.location.reload();
    })
    .catch(error =>{
      setLoading(false)
      
      setSuccessAlert(false)
      setErrorAlert(true)
      
    })
    }
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
      position="relative">
        {successAlert &&
        <Alert status='success'>
    <AlertIcon />
    Task Deleted successfully
  </Alert> }

  {errorAlert &&
        <Alert status='error'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert> }
        <>
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDelete(deleteTaskId)}
          isLoading = {loading}
        />
      </>
      <Flex justifyContent="flex-end" display={{ md: "flex", base: "none" }}>
        <Icon
          as={FaTimes}
          color="gray.500"
          cursor="pointer"
          onClick={ handleOpenCloseDetails}
        />
      </Flex>

      <Text fontSize="18px" fontWeight={700} my={4}>
        {todo?.title}
      </Text>

      <HStack>
        <Image alt={"calender"} src={CalenderIcon} />
        <Text>{FormattedDate(todo.date)}</Text>
      </HStack>

      <HStack mt={2}>
        <Image alt={"clock"} src={ClockIcon} />
        <Text>
          {`${convertTo12HourFormat(todo.startTime)} - ${convertTo12HourFormat(
            todo.endTime
          )}`}
        </Text>
      </HStack>

      <Flex mt={8}>
        <button 
        onClick={() => {
          // onOpen();
          
          setIsDeleteModalOpen(true);
        }}
        className="flex-1 bg-white hover:bg-dark-200 text-dark-500 hover:text-dark font-600 py-2 px-4 border border-grey-500 rounded">
           {loading ?<Spinner/> : 'Delete'}
        </button>

        <button
          onClick={() => {
            onEditClick();
            // setIsVisible(false);
          }}
          className="ml-3 flex-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
         Edit
        </button>

        {/* <Input placeholder="" size="md" type="time" /> */}
      </Flex>
    </Box>
  );
}

export default DetailsCardComponent;
