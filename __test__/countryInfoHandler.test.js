import axios from "axios";
import { getCountryInfo } from "../src/client/js/countryInfoHandler";
import notify from "../src/client/js/notifyHandler";

jest.mock("axios");
jest.mock("../src/client/js/notifyHandler");

describe("getCountryInfo", () => {
  test("Should return destantion data when API call is successful", async () => {
    const mockRes = {
      data: {
        data: {
          geonames: [
            {
              lng: "35.20422",
              name: "Ramallah",
              countryName: "Palestine",
              lat: "31.89964",
            },
          ],
        },
      },
    };

    axios.post.mockResolvedValue(mockRes);

    const city = "Ramallah";
    const res = await getCountryInfo(city);

    expect(res).toEqual({
      lat: "31.89964",
      long: "35.20422",
      city: "Ramallah",
      country: "Palestine",
    });
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/countryInfo",
      { city }
    );
  });

  test("Should call notify if error happen when Calling API", async () => {
    const mockError = new Error("Network Error");
    axios.post.mockRejectedValue(mockError);

    const city = "InvalidCity";
    const result = await getCountryInfo(city);

    expect(result).toBeUndefined();
    expect(notify).toHaveBeenCalledWith("error", "Network Error");
  });
});
