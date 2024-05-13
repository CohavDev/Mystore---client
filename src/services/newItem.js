import axios from "axios";
// const { ObjectId } = require("mongodb");

export default async function newItemsAPI(itemArray) {
  console.log("newItemAPI called");
  console.log(itemArray);
  for (const index in itemArray) {
    const res = await newItemAPI(itemArray[index]);
    if (!res) {
      // Failure
      return false;
    }
  }
  // Success
  return true;
}
async function newItemAPI(item) {
  const serverURL = "http://localhost:5038";
  console.log("inserting item in DB...(new item)");
  delete item["_id"];
  return await axios
    .post(serverURL + "/api/store/AddItem", {
      newItem: item,
    })
    .then((res) => {
      console.log("item %s successfuly", res);
      return true;
    })
    .catch((error) => {
      console.log("inserting new item failed");
      console.log(error);
      return false;
    });
}
