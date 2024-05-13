import axios from "axios";
export default async function editItemsAPI(itemArray) {
  console.log("editItemsAPI called");
  console.log(itemArray);
  for (const innerID in itemArray) {
    const res = await editItemAPI(itemArray[innerID], innerID);
    if (!res) {
      // Failure
      return false;
    }
  }
  // Success
  return true;
}
async function editItemAPI(item, innerID) {
  const serverURL = "http://localhost:5038";
  console.log("modifiying item in DB...(edit)");

  return await axios
    .post(serverURL + "/api/store/edititem", {
      _id: innerID,
      updatedItem: item,
    })
    .then((res) => {
      console.log("item %s successfuly upadted", innerID);
      return true;
    })
    .catch((error) => {
      console.log("edit of item %d failed", innerID);
      console.log(error);
      return false;
    });
}
