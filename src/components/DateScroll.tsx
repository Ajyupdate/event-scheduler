import { Box, Card, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";





export interface DateScrollProps{
    onDateClick: (clickedDate: string,) => void
}
const DateScroll = ({onDateClick}: DateScrollProps) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = new Date(today.getFullYear(), currentMonth, 1);
  
  const lastDayOfMonth = new Date(today.getFullYear(), currentMonth + 1, 0);
  const totalDaysInMonth = lastDayOfMonth.getDate();

  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [isToday, setIsToday] = useState(false)

  useEffect(() => {
    const calculateVisibleCards = () => {
      const containerWidth = window.innerWidth;
     
      // Set a maximum width for the container (adjust as needed)
      const maxWidth = 1000;
      const numberOfCardsToShow = Math.min(
        Math.floor(containerWidth / 100), // Adjust the card width as needed
        Math.floor(maxWidth / 100) // Calculate based on maxWidth
      );

      const cardsToDisplay = [];
     
      let startDay = today.getDate() - Math.floor(numberOfCardsToShow / 2);

      if (startDay < 1) {
        startDay = 1;
      }

      for (let i = 0; i < numberOfCardsToShow; i++) {
        const day = startDay + i;
        cardsToDisplay.push(day);
        
      }
     
      setVisibleCards(cardsToDisplay);
    };

    calculateVisibleCards();

    // Recalculate visible cards on window resize
    window.addEventListener("resize", calculateVisibleCards);

    return () => {
      window.removeEventListener("resize", calculateVisibleCards);
    };
  }, []);

  const days = [];
  

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const currentDate = new Date(today.getFullYear(), currentMonth, day);
 
    const dayName = currentDate.toLocaleDateString("en-US", {
      weekday: "short",
    });
   
    const dateNumber = currentDate.getDate();
  
    
    const isCurrentDate = currentDate.toDateString() === today.toDateString();
    const isVisible = visibleCards.includes(dateNumber);

    const handleCardClick = () => {
      // Extract day, month, and year
      const clickedDate = currentDate.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      const splitedClickedDate =  (clickedDate.split(' '))
      const splitedTodaysDate = (today.toDateString().split(' '))
     

      // Set the clicked card
      setClickedCard(dateNumber);

      
      
     onDateClick(clickedDate)

    };

    days.push(
      isVisible && (
        <Box
          key={day}
          width={isVisible ? "100px" : "80px"} // Adjust the card width as needed
          height="100px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginRight="2px"
          fontSize="lg"
          onClick={handleCardClick} // Add onClick event handler
        >
          <Card
            bg={
              dateNumber === clickedCard
                // ? "#FFA500"
                ? "blue.200"
                : isCurrentDate
                 ? "#3F5BF6"
              
                : ""
            }
            py={2}
            shadow={"sm"}
            px={4}
            ml={4}
            color={
              dateNumber === clickedCard
                ? "white"
                : isCurrentDate
                ? "white"
                : ""
            }
            variant={"outline"}>
            <Text fontSize="16px" fontWeight="600">
              {dayName}
            </Text>
            <Center>
              <Text fontSize="16px" fontWeight="600">
                {dateNumber}
              </Text>
            </Center>
          </Card>
        </Box>
      )
    );
  }

  const monthYearText = `${today.toLocaleString("en-US", {
    month: "long",
  })} ${today.getFullYear()}`;

  return (
    <div style={{ touchAction: "pan-x", overflowX: "auto" }}>
      <Text textAlign="left" fontSize="16px" fontWeight="600" mb="2">
        {monthYearText}
      </Text>
      <Flex whiteSpace="nowrap" mr={2}>{days}</Flex>
    </div>
  );
};

export default DateScroll;


