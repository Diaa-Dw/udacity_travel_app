const isValidDate = (userDate) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const compareDates = new Date(userDate) - new Date(currentDate);
  if (compareDates < 0) {
    return false;
  } else {
    return true;
  }
};

export default isValidDate;
