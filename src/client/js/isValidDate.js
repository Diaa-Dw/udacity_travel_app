const isValidDate = (userDate) => {
  console.log("🚀 ~ isValidDate ~ userDate:", userDate);
  const currentDate = new Date().toISOString().split("T")[0];
  console.log("🚀 ~ isValidDate ~ currentDate:", currentDate);
  const compareDates = new Date(userDate) - new Date(currentDate);
  console.log("🚀 ~ isValidDate ~ compareDates:", compareDates);
  if (compareDates < 0) {
    return false;
  } else {
    return true;
  }
};

export default isValidDate;
