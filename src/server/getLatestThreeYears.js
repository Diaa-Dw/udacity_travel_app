const getLatestThreeYearsDate = (userDate) => {
  const res = [];
  const targetDate = new Date(userDate);
  for (let i = 3; i >= 1; i--) {
    let startDate = new Date(targetDate);
    startDate.setFullYear(startDate.getFullYear() - i);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    startDate = startDate.toISOString().split("T")[0];
    endDate = endDate.toISOString().split("T")[0];

    res.push({ startDate, endDate });
  }
  return res;
};

module.exports = getLatestThreeYearsDate;
