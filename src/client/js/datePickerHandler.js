const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

const dateEl = document.getElementById("departureDate");
dateEl.value = formattedDate;
dateEl.setAttribute("min", formattedDate);
