import axios from "axios";

export const getCountryInfo = async (city) => {
  try {
    const res = await axios.post("http://localhost:8080/countryInfo", {
      city,
    });
    console.log("🚀 ~ getCountryInfo ~ res:", res);
  } catch (error) {
    console.log("🚀 ~ getCountryInfo ~ error:", error);
  }
};
