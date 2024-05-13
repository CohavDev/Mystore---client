import axios from "axios";
export default async function deleteItemsAPI(itemArray) {
  console.log("deleteItemsAPI called");
  console.log(itemArray);
  for (const innerID in itemArray) {
    const res = await deleteItemAPI(innerID);
    if (!res) {
      // Failure
      return false;
    }
  }
  // Success
  return true;
}
async function deleteItemAPI(innerID) {
  const serverURL = "http://localhost:5038";
  console.log("modifiying item in DB...(delete)");

  return await axios
    .post(serverURL + "/api/store/deleteitem", {
      _id: innerID,
    })
    .then((res) => {
      console.log("item %s successfuly deleted", innerID);
      return true;
    })
    .catch((error) => {
      console.log("deleteion of item %d failed", innerID);
      console.log(error);
      return false;
    });
}
