import axios from "axios";
export default async function loadData() {
  const serverURL = "http://localhost:5038";
  console.log("loading data from server, port 5038");

  return await axios
    .get(serverURL + "/api/store/getitems")
    .then((response) => {
      console.log("data loaded successfully");
      return response.data;
    })
    .catch((error) => {
      console.log("error loading data from server");
      console.log(error);
    });
}
