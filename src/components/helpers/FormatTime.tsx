export function convertTo12HourFormat(timeString: string) {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);
  
    // Determine whether it's "am" or "pm"
    const period = hours >= 12 ? "pm" : "am";
  
    // Convert to 12-hour format
    const twelveHour = hours % 12 || 12;
  
    // Create the formatted time string in "hh:mm am/pm" format
    const formattedTime = `${twelveHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  
    return formattedTime;
  }
  