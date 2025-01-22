const { default: axios } = require("axios");

const handlePlaceImage = async (destantionData) => {
  console.log("🚀 ~ handlePlaceImage ~ destantionData:", destantionData);
  const { city, country } = destantionData;
  console.log("🚀 ~ handlePlaceImage ~ country:", country);
  console.log("🚀 ~ handlePlaceImage ~ city:", city);
  try {
    const response = await axios.post("http://localhost:8080/getPlaceImage", {
      city,
      country,
    });
    return response.data.data.largeImageURL
  } catch (error) {
    console.log("🚀 ~ handlePlaceImage ~ error:", error);
  }
};

export default handlePlaceImage;
