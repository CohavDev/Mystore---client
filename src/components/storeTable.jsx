import Table from "@mui/joy/Table";
import TableItem from "./tableItem";
import { useCallback, useEffect, useRef, useState } from "react";
import loadDataAPI from "../services/loadData";
import editItemsAPI from "../services/editItem";
import deleteItemsAPI from "../services/deleteItem";

export default function StoreTable(props) {
  const [data, setData] = useState();
  const [itemsArray, setArray] = useState([]);
  const [modifiedData, setModifiedData] = useState({}); // items that were edited and havent been saved to DB
  const [garbageCan, setGarbageCan] = useState({}); // items that were deleted locally by the user, and DB is not updated
  const mountedRef = useRef();
  // ####   -----   Callback Methods  ----   ####
  const InsertEditArrayCallback = useCallback(
    (_id, item) => {
      delete item["_id"];
      setModifiedData((prevVal) => ({ ...prevVal, [_id]: item }));
    },
    [modifiedData]
  );
  //abort edit of specific item
  const deleteEditArrayCallback = useCallback(
    (_id) => {
      setModifiedData((prevVal) => {
        const temp = { ...prevVal };
        delete temp[_id];
        return temp;
      });
    },
    [modifiedData]
  );
  const loadDataFromServer = () => {
    loadDataAPI().then((data) => {
      setData(data);
    });
  };

  const deleteItemCallback = (_id, item) => {
    delete item["_id"];
    setGarbageCan((prevVal) => ({ ...prevVal, [_id]: item }));
  };
  //abort deletion of specific item
  const abortItemDeleteCallback = (_id) => {
    const temp = { ...garbageCan };
    delete temp[_id];
    setGarbageCan(temp);
  };

  // ####   -------     UseEffect Hooks    --------    ####

  useEffect(() => {
    if (!mountedRef.current) {
      loadDataFromServer();
    }
    mountedRef.current = true;
  }, []);
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
    console.log(modifiedData);
    deleteItemsAPI(garbageCan).then((isDeleted) => {
      if (isDeleted) {
        setGarbageCan({});
      }
    });
    editItemsAPI(modifiedData).then((isSaved) => {
      if (isSaved) {
        setModifiedData({});
        loadDataFromServer();
      }
    });
  }, [props.saveClick]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    console.log("cancel toggled...");
  }, [props.cancelClick]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    setArray([]);
    let tempArray = [];
    let visualId = 0;
    for (const counter in data) {
      const item = data[counter];
      visualId++;
      tempArray.push(
        <TableItem
          key={visualId}
          id={visualId} //id for visual order only
          _id={item["_id"]} //internal id - unique!
          name={item["name"]}
          desc={item["desc"]}
          catalogNumber={item["catalogNumber"]}
          type={item["type"]}
          marketDate={item["marketDate"]}
          notifyModifiedEdit={(_id, item) => InsertEditArrayCallback(_id, item)}
          deleteItem={(_id, item) => deleteItemCallback(_id, item)}
          abortDeleteItem={(_id) => abortItemDeleteCallback(_id)}
          abortModifiedEdit={(_id) => deleteEditArrayCallback(_id)}
        ></TableItem>
      );
      setArray(tempArray);
    }
  }, [data]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    if (
      Object.keys(garbageCan).length === 0 &&
      Object.keys(modifiedData).length === 0
    ) {
      props.setModified(false);
    } else {
      props.setModified(true);
    }
  }, [garbageCan, modifiedData]);
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
