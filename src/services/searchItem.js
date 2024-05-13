import axios from "axios";
export default async function searchItem(searchTerm) {
  const serverURL = "http://localhost:5038";
  console.log("loading data from server, port 5038");

  return await axios
    .post(serverURL + "/api/store/searchItem", { name: searchTerm })
    .then((response) => {
      if (response.data != "error") {
        console.log("search loaded successfully", response.data);
      } else {
        console.log("error loading data from server");
      }
      return response.data;
    })
    .catch((error) => {
      console.log("error loading data from server");
      console.log(error);
    });
}
