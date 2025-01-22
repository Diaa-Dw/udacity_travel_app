const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

const dateEl = document.getElementById("dateInput");
dateEl.value = formattedDate;
dateEl.setAttribute("min", formattedDate);
