import axios from "axios";
import notify from "./notifyHandler";

export const getCountryInfo = async (city) => {
  try {
    const res = await axios.post("http://localhost:8080/countryInfo", {
      city,
    });
    const { data } = res.data;
    const { geonames } = data;
    const destinationData = {
      lat: geonames[0].lat,
      long: geonames[0].lng,
      city: geonames[0].name,
      country: geonames[0].countryName,
    };
    return destinationData;
  } catch (error) {
    const message =
      error.message || "Somthing went wrong while fetching destanation data.";

    notify("error", message);
  }
};
