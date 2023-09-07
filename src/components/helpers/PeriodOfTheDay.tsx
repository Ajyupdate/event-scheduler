 export const GetGreetingPeriod = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return " Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return " Afternoon";
  } else {
    return " Evening";
  }
};


