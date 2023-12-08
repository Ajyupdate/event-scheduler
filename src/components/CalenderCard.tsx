import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthCalender.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface Icalenderprops {
  onDateClick: (clickedDate: string) => void;
}

function CalenderCard({ onDateClick }: Icalenderprops) {
  //
  const [value, onChange] = useState<Value>(new Date());

  const formatShortWeekday = (locale: string | undefined, date: Date) => {
    const options = { weekday: "short" as "short" };
    return new Intl.DateTimeFormat(locale, options)
      .format(date)

      .slice(0, 2)
      .toLowerCase();
  };

  return (
    <div>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bgColor="white"
        maxW="400px" // Customize the maximum width as needed
      >
        <Calendar
          onChange={onChange}
          onClickDay={() => console.log(value)}
          value={value}
          formatShortWeekday={formatShortWeekday}
        />
      </Box>

      <Box></Box>
    </div>
  );
}

export default CalenderCard;
