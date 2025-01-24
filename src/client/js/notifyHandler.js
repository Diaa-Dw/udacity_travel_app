import Toastify from "toastify-js";

const notify = (type, message) => {
  if (type === "success") {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#59b259",
        borderRadius: ".8rem",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  } else if (type === "error") {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#f05855",
        borderRadius: ".8rem",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
};

export default notify;
