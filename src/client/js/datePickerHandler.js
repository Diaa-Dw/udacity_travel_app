const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate());
const formattedDate = tomorrow.toISOString().split("T")[0];

const dateEl = document.getElementById("dateInput");
dateEl.value = formattedDate;
dateEl.setAttribute("min", formattedDate);
