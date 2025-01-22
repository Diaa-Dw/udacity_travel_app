import axios from "axios";

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
    console.log("🚀 ~ getCountryInfo ~ destinationData:", destinationData);
    return destinationData;
  } catch (error) {
    console.log("🚀 ~ getCountryInfo ~ error:", error);
  }
};
