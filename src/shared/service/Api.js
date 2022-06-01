import axios from "axios";

const key = "24494931-7dc5820272f9876b2770bf0f4";

const instance = axios.create({
  baseURL: "https://pixabay.com/api",
  params: {
    key: key,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
  },
});

const searchPictures = (page = 1, q) => {
  return instance.get("/", {
    params: {
      page,
      q,
    },
  });
};

export const Api = {
  searchPictures,
};
