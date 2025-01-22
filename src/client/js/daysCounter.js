const daysCounter = (inputDate) => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDay = `0${date.getDate()}`.slice(-2);
  const currentDate = `${date.getFullYear()}-${currentMonth}-${currentDay};`;
  const travelDate = inputDate;
  const differnceInMS = new Date(travelDate) - new Date(currentDate);
  const differnceInDay = differnceInMS / (1000 * 60 * 60 * 24);
  return Math.ceil(differnceInDay);
};

export default daysCounter;
