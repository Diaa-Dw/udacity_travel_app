import axios from "axios";
import notify from "../src/client/js/notifyHandler";
import handlePlaceImage from "../src/client/js/handlePalceImage";

jest.mock("axios");
jest.mock("../src/client/js/notifyHandler");

describe("handlePlaceImage", () => {
  test("Should return image url of destantion when API calling is successful", async () => {
    const mockRes = {
      data: {
        data: {
          id: 7103460,
          pageURL:
            "https://pixabay.com/photos/birds-seagulls-sunset-view-7103460/",
          type: "photo",
          tags: "birds, seagulls, sunset, view, seascape, ornithology, wildlife, flock, istanbul, uskudar, istanbul, istanbul, istanbul, nature, istanbul, istanbul",
          previewURL:
            "https://cdn.pixabay.com/photo/2022/03/31/17/44/birds-7103460_150.jpg",
          previewWidth: 150,
          previewHeight: 100,
          webformatURL:
            "https://pixabay.com/get/g49d067a3d4d7f1e5cde1e34dca33b7ee7a9dff23526da5de461241e960e004e7bca011ce608df006e83b209cfd4771f9b1d59df27b4a14981c06cd48c60106ef_640.jpg",
          webformatWidth: 640,
          webformatHeight: 427,
          largeImageURL:
            "https://pixabay.com/get/g4a5628908e181d478963e517d73c0374754151d768f164fa862f35dfec3fb42116ef0f5b5759090b3ad90b20334ebd07fe14e94e4ee86b6122160d00781d4d32_1280.jpg",
          imageWidth: 5065,
          imageHeight: 3376,
          imageSize: 2413679,
          views: 41202,
          downloads: 36087,
          collections: 1537,
          likes: 64,
          comments: 13,
          user_id: 11024074,
          user: "umutizgi",
          userImageURL:
            "https://cdn.pixabay.com/user/2020/08/23/18-08-39-58_250x250.jpg",
        },
      },
    };

    axios.post.mockResolvedValue(mockRes);

    const detanationData = {
      city: "Istanbul",
      country: "Turkey",
    };

    const res = await handlePlaceImage(detanationData);

    expect(res).toEqual(
      "https://pixabay.com/get/g4a5628908e181d478963e517d73c0374754151d768f164fa862f35dfec3fb42116ef0f5b5759090b3ad90b20334ebd07fe14e94e4ee86b6122160d00781d4d32_1280.jpg"
    );

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/getPlaceImage",
      { city: detanationData.city, country: detanationData.country }
    );
  });

  test("Should call notify if error happen when Calling API", async () => {
    const mockError = new Error("Network Error");
    axios.post.mockRejectedValue(mockError);

    const detanationData = {
      city: "Istanbul",
      country: "Turkey",
    };
    const result = await handlePlaceImage(detanationData);

    expect(result).toBeUndefined();
    expect(notify).toHaveBeenCalledWith("error", "Network Error");
  });
});
