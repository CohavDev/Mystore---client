import Table from "@mui/joy/Table";
import TableItem from "./tableItem";
import { useCallback, useEffect, useRef, useState } from "react";
import loadDataAPI from "../services/loadData";
import editItemsAPI from "../services/editItem";
import deleteItemsAPI from "../services/deleteItem";
import newItemsAPI, { generateID } from "../services/newItem";

export default function StoreTable(props) {
  const [data, setData] = useState();
  const [itemsArray, setArray] = useState([]);
  const [modifiedData, setModifiedData] = useState({}); // items that were edited and havent been saved to DB
  const [garbageCan, setGarbageCan] = useState({}); // items that were deleted locally by the user, and DB is not updated
  const [newItems, setNewItems] = useState({}); // items that were created in current seession and havent been saved to DB yet
  const [isUIUpdated, setUpdated] = useState(true);
  const mountedRef = useRef();
  const mountedRef2 = useRef();

  const loadDataFromServer = () => {
    loadDataAPI().then((data) => {
      setData(data);
    });
  };
  // ####   -----   Callback Methods  ----   ####
  const InsertEditCallback = useCallback(
    (_id, item) => {
      delete item["_id"];
      setModifiedData((prevVal) => ({ ...prevVal, [_id]: item }));
    },
    [modifiedData]
  );
  //abort edit of specific item
  const deleteEditCallback = useCallback(
    (_id) => {
      setModifiedData((prevVal) => {
        const temp = { ...prevVal };
        delete temp[_id];
        return temp;
      });
    },
    [modifiedData]
  );
  

  const insertDeleteCallback = useCallback((_id, item) => {
    delete item["_id"];
    setGarbageCan((prevVal) => ({ ...prevVal, [_id]: item }));
  },[garbageCan]);
  //abort deletion of specific item
  const abortDeleteCallback = useCallback((_id) => {
    const temp = { ...garbageCan };
    delete temp[_id];
    setGarbageCan(temp);
  },[garbageCan]);
  const newItemCallback = useCallback(() => {
    console.log("adding");

    const visualId = itemsArray.length + 1;
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const strDate = date.toISOString().split("T")[0];
    const tempId = "key_" + visualId;

    const newItem = (
      <TableItem
        newItem={true}
        isUpdated={isUIUpdated}
        formWarn={(warn) => props.formWarnCallback(warn)}
        _id={tempId}
        key={tempId}
        id={visualId} //id for visual order only
        name={""}
        desc={""}
        catalogNumber={0}
        type={""}
        marketDate={strDate}
        notifyModifiedEdit={(_id, item) => {
          setNewItems((prevItems) => {
            delete item[_id];
            return { ...prevItems, [_id]: item };
          });
          setArray((prevArray) => [...prevArray]);
        }}
        deleteItem={(_id, item) => {
          setNewItems((prevItems) => {
            const temp = { ...prevItems };
            delete temp[_id];
            return temp;
          });
          setArray((prevArray) => {
            const temp = [...prevArray];
            delete temp[item.id - 1];
            return temp;
          });
        }}
        abortDeleteItem={(_id) => {}}
        abortModifiedEdit={(_id) => {}}
      />
    );
    const newItemJson = {
      _id: tempId, //temporary id
      name: "",
      desc: "",
      catalogNumber: "",
      type: "",
      marketDate: strDate,
    };
    setNewItems((prevItems) => ({ ...prevItems, [tempId]: newItemJson }));
    setArray((prevArray) => [...prevArray, newItem]);
  },[itemsArray,isUIUpdated,newItems]);
  // ####   -------     UseEffect Hooks    --------    ####

  useEffect(() => {
    if (!mountedRef.current) {
      loadDataFromServer();
    }
    mountedRef.current = true;
  }, []);
  // updating data from server
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    console.log("data modified:", modifiedData);
  }, [modifiedData]);

  useEffect(() => {
    if (!mountedRef.current || !props.saveClick) {
      return;
    }

    //####  Save modified & edited items into DB ###
    console.log("save button click");
    props.isLoadingCallback(true);
    console.log(modifiedData);
    async function run() {
      await newItemsAPI(newItems).then((isSaved) => {
        if (isSaved === "error") {
          alert("error occured when saving new items");
        } else {
          setNewItems({});
          // loadDataFromServer();
        }
      });
      await deleteItemsAPI(garbageCan).then((isDeleted) => {
        if (isDeleted) {
          setGarbageCan({});
        }
      });
      await editItemsAPI(modifiedData).then((isSaved) => {
        if (isSaved) {
          setModifiedData({});
          loadDataFromServer();
        }
      });
    }
    run();
    setTimeout(() => {
      props.isLoadingCallback(false);
      setUpdated(true);
    }, 1500);
  }, [props.saveClick]);

  useEffect(() => {
    if (!mountedRef.current || !props.cancelClick) {
      return;
    }
    setModifiedData({});
    setGarbageCan({});
    props.setModified(false);
    console.log("cancel toggled...");
  }, [props.cancelClick]);

  useEffect(() => {
    if (!mountedRef2.current) {
      mountedRef2.current = true;
      return;
    }
    console.log("new item clicked...");
    newItemCallback();
  }, [props.newItemClick]);

  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    console.log("setting array");
    setArray([]);
    let tempArray = [];
    let visualId = 0;
    for (const counter in data) {
      const item = data[counter];
      console.log(item["name"])
      visualId++;
      tempArray.push(
        <TableItem
          isUpdated={isUIUpdated}
          formWarn={(warn) => props.formWarnCallback(warn)}
          key={item["_id"]}
          id={visualId} //id for visual order only
          _id={item["_id"]} //internal id - unique!
          name={item["name"]}
          desc={item["desc"]}
          catalogNumber={item["catalogNumber"]}
          type={item["type"]}
          marketDate={item["marketDate"]}
          notifyModifiedEdit={(_id, item) => InsertEditCallback(_id, item)}
          deleteItem={(_id, item) => insertDeleteCallback(_id, item)}
          abortDeleteItem={(_id) => abortDeleteCallback(_id)}
          abortModifiedEdit={(_id) => deleteEditCallback(_id)}
        ></TableItem>
      );
      setArray([...tempArray]);
    }
  }, [data]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    console.log("changing updated state...");
    if (
      Object.keys(garbageCan).length === 0 &&
      Object.keys(modifiedData).length === 0 &&
      Object.keys(newItems).length === 0
    ) {
      console.log("update=true");
      setUpdated(true);
      props.setModified(false);
    } else {
      console.log("update=false");

      setUpdated(false);
      props.setModified(true);
    }
  }, [garbageCan, modifiedData, newItems]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    if (Object.keys(props.searchData).length === 0) {
      loadDataFromServer();
      return;
    }
    setData(props.searchData);
  }, [props.searchData]);
  // JSX elements
  return (
    <Table aria-label="basic table" stickyHeader hoverRow>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th style={{ width: "25%" }}>Description</th>
          <th>Catalog Number</th>
          <th>Type</th>
          <th>Marketing Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{itemsArray}</tbody>
    </Table>
  );
}
