import { useEffect, useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { Edit, Delete, Close, DeleteForever, Add } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import { Box } from "@mui/joy";

export default function TableItem(props) {
  // id has no state because it is fixed and should not be changed by the user
  const [name, setName] = useState(props.name);
  const [desc, setDesc] = useState(props.desc);
  const [catalogNumber, setCtk] = useState(props.catalogNumber);
  const [type, setType] = useState(props.type);
  const [marketDate, setDate] = useState(props.marketDate);
  const [editEnabled, setEdit] = useState(false);
  const [onlineData, setOnlineData] = useState(props); // a copy of the data that is updated on the server's DB
  const [isModified, setModified] = useState(false);
  const [isDeleted, setDelete] = useState(false);
  const mountedRef = useRef();

  const getItem = () => {
    return {
      _id: props._id,
      name: name,
      desc: desc,
      catalogNumber: catalogNumber,
      type: type,
      marketDate: marketDate,
    };
  };
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    if (
      onlineData.name !== name ||
      onlineData.desc !== desc ||
      onlineData.catalogNumber != catalogNumber ||
      onlineData.type !== type ||
      onlineData.marketDate !== marketDate
    ) {
      setModified(true);
      props.notifyModifiedEdit(props._id, getItem());
      console.log("notify edit");
    } else {
      setModified(false);
      props.abortModifiedEdit(props._id);
      console.log("notify abort edit");
    }
  }, [name, desc, catalogNumber, type, marketDate]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    if (isDeleted) {
      props.deleteItem(props._id, getItem);
    } else {
      props.abortDeleteItem(props._id);
    }
  }, [isDeleted]);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
  }, []);
  return (
    <tr
      style={{
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease",
        backgroundColor: isDeleted ? "red" : isModified ? "orange" : "white",
      }}
    >
      {/* id -  read only */}
      <td>{props.id}</td>
      <td>
        {editEnabled ? (
          <Input
            required
            placeholder="Item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            slotProps={{ input: { maxLength: 50 } }}
          />
        ) : (
          name
        )}
      </td>
      <td>
        {editEnabled ? (
          <Textarea
            placeholder="Write your description here"
            minRows={2}
            maxRows={2}
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
        ) : (
          desc
        )}
      </td>
      <td>
        {editEnabled ? (
          <Input
            required
            placeholder="Catalog Number"
            type="number"
            slotProps={{ input: { min: 0 } }}
            value={catalogNumber}
            onChange={(event) => setCtk(event.target.value)}
          />
        ) : (
          catalogNumber
        )}
      </td>
      <td>
        {editEnabled ? (
          <Select
            placeholder="Select Type"
            defaultValue={type}
            onChange={(event, newValue) => setType(newValue)}
          >
            <Option value="vagetable">Vagetable</Option>
            <Option value="fruit">Fruit</Option>
            <Option value="fieldCrops">Field Crops</Option>
          </Select>
        ) : (
          type
        )}
      </td>
      <td>
        {editEnabled ? (
          <Input
            type="date"
            value={marketDate}
            onChange={(event) => setDate(event.target.value)}
          />
        ) : (
          marketDate
        )}
      </td>
      <td>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <IconButton onClick={() => setEdit(!editEnabled)}>
            {editEnabled ? <Close /> : <Edit />}
          </IconButton>
          <IconButton onClick={() => setDelete(!isDeleted)}>
            {isDeleted ? <Add /> : <Delete />}
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
