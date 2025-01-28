import notify from "./notifyHandler";

const { default: axios } = require("axios");

const handlePlaceImage = async (destantionData) => {
  const { city, country } = destantionData;
  try {
    const response = await axios.post("http://localhost:8080/getPlaceImage", {
      city,
      country,
    });
    return response.data.data.largeImageURL;
  } catch (error) {
    const message =
      error.message || "Somthing went wrong while fetching place image.";
    notify("error", message);
  }
};

export default handlePlaceImage;
