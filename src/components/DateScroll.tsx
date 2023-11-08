



import { Box, Card, Center, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export interface DateScrollProps {
  onDateClick: (clickedDate: string) => void;
}

const DateScroll = ({ onDateClick }: DateScrollProps) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const totalDaysInMonth = new Date(today.getFullYear(), currentMonth + 1, 0).getDate();

  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const containerRef =useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   // Calculate the initial scroll position for today's date
  //   const todayIndex = today.getDate() - 1;
  //   const containerWidth = containerRef.current.clientWidth;
  //   const cardWidth = 80; // Adjust the card width as needed for mobile

  //   const visibleCardsCount = Math.floor(containerWidth / cardWidth);
  //   const initialScrollPosition = todayIndex * cardWidth - (visibleCardsCount / 2) * cardWidth;

  //   if (containerRef.current) {
  //     containerRef.current.scrollLeft = initialScrollPosition;
  //   }
  // }, []);

  useEffect(() => {
    const containerElement = containerRef.current; // Store a reference to the DOM element
    if (containerElement) {
      const todayIndex = today.getDate() - 1;
      const containerWidth = containerElement.clientWidth;
      const cardWidth = 80; // Adjust the card width as needed for mobile
  
      const visibleCardsCount = Math.floor(containerWidth / cardWidth);
      const initialScrollPosition = todayIndex * cardWidth - (visibleCardsCount / 2) * cardWidth;
  
      containerElement.scrollLeft = initialScrollPosition;
    }
  }, []);
  

  const handleCardClick = (dateNumber: number) => {
    const currentDate = new Date(today.getFullYear(), currentMonth, dateNumber);
    const clickedDate = currentDate.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    onDateClick(clickedDate);
    setClickedCard(dateNumber);
  };

  const days = Array.from({ length: totalDaysInMonth }, (_, index) => index + 1);

  return (
    
    <div
    className="w-80 md:w-full"
      ref={containerRef}
      style={{
        display: "flex",
        overflowX: "auto",
        //  width: "100%", // Set a fixed width for the container
        whiteSpace: "nowrap",
        
      }}
    >
      {days.map((dateNumber) => {
        const currentDate = new Date(today.getFullYear(), currentMonth, dateNumber);
        const dayName = currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const isCurrentDate = currentDate.toDateString() === today.toDateString();

        return (
          <Box
          
            key={dateNumber}
            width="80px" // Adjust the card width as needed for mobile
            height="100px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginRight="2px"
            fontSize="lg"
          >
            <Card
              bg={dateNumber === clickedCard ? "blue.200" : isCurrentDate ? "#3F5BF6" : ""}
              py={2}
              shadow={"sm"}
              px={4}
              ml={4}
              color={dateNumber === clickedCard ? "white" : isCurrentDate ? "white" : ""}
              variant={"outline"}
              onClick={() => handleCardClick(dateNumber)}
            >
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
        );
      })}
    </div>
  );
};

export default DateScroll;
