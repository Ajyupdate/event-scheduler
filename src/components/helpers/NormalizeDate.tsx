export function NormalizeDate(todaysDate: string) {
  var dateObject = new Date(todaysDate);

  // Define an array of month names
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day, month, and year components from the Date object
  var day = dateObject.getDate();
  var month = monthNames[dateObject.getMonth()];
  var year = dateObject.getFullYear();

  // Get the day of the week
  var dayOfWeek = dateObject.toLocaleDateString("en-US", { weekday: "short" });

  // Format the date with 2-digit day
  var formattedDate =
    dayOfWeek +
    ", " +
    month +
    " " +
    day.toString().padStart(2, "0") +
    ", " +
    year;

  // Output the formatted date

  return formattedDate;
}
