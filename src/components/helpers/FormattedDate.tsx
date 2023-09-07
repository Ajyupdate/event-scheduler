export function FormattedDate(inputDate: string) {
    let date;
    if (inputDate === "Today") {
      date = new Date();
      console.log(date);
    } else {
      console.log(inputDate);
      date = new Date(inputDate);
      console.log(date);
      console.log(new Date());
    }
  
    // Get day, month, and year
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    // Convert day to have "st", "nd", "rd", or "th" suffix
    let dayWithSuffix;
    if (day >= 11 && day <= 13) {
      dayWithSuffix = `${day}th`;
    } else {
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1:
          dayWithSuffix = `${day}st`;
          break;
        case 2:
          dayWithSuffix = `${day}nd`;
          break;
        case 3:
          dayWithSuffix = `${day}rd`;
          break;
        default:
          dayWithSuffix = `${day}th`;
      }
    }
  
    return `${dayWithSuffix} ${month}, ${year}`;
  }
  