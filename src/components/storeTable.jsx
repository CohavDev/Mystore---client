import Table from "@mui/joy/Table";
import TableItem from "./tableItem";
import { useEffect, useState } from "react";
import loadData from "../services/loadData";

export default function StoreTable() {
  const [data, setData] = useState();
  const [itemsArray, setArray] = useState([]);
  useEffect(() => {
    loadData().then((data) => {
      setData(data);
    });
  }, []);
  useEffect(() => {
    setArray([]);
    for (const item in data) {
      console.log("adding item");
      setArray([
        ...itemsArray,
        <TableItem
          id={1}
          name="Frozen Yougurt"
          desc="Im tasty!"
          catalogNumber={4}
          type="food"
          marketDate="2024-05-11"
        ></TableItem>,
      ]);
    }
  }, [data]);
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
      <tbody>
        {itemsArray}
        {/* <TableItem
          id={1}
          name="Frozen Yougurt"
          desc="Im tasty!"
          catalogNumber={4}
          type="food"
          marketDate="2024-05-11"
        />
        <TableItem
          id={1}
          name="Frozen Yougurt"
          desc="Im tasty!"
          catalogNumber={4}
          type="food"
          marketDate="1998-12-26"
        />
        <TableItem
          id={1}
          name="Frozen Yougurt"
          desc="Im tasty!"
          catalogNumber={4}
          type="food"
          marketDate="1-1-2024"
        />
        <TableItem
          id={1}
          name="Frozen Yougurt"
          desc="Im tasty!"
          catalogNumber={4}
          type="food"
          marketDate="1-1-2024"
        /> */}
      </tbody>
    </Table>
  );
}
