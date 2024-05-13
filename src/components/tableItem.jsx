import { useEffect, useState, useRef } from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { Edit, Delete, Add, Done, Warning } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import { Box } from "@mui/joy";

export default function TableItem(props) {
  // id has no state because it is fixed and should not be changed by the user
  const [name, setName] = useState(props.name);
  const [desc, setDesc] = useState(props.desc);
  const [catalogNumber, setCtk] = useState(props.catalogNumber);
  const [type, setType] = useState(props.type);
  const [marketDate, setDate] = useState(props.marketDate);
  const [editEnabled, setEdit] = useState(props.newItem ? true : false);
  const [onlineData, setOnlineData] = useState(props); // a copy of the data that is updated on the server's DB
  const [isModified, setModified] = useState(false);
  const [isDeleted, setDelete] = useState(false);
  const [newItem, setNew] = useState(false);
  const [formWarning, setWarning] = useState(false);
  const mountedRef = useRef();
  const mountedRef2 = useRef();
  const getItem = () => {
    return {
      _id: props._id,
      id: props.id,
      name: name,
      desc: desc,
      catalogNumber: catalogNumber,
      type: type,
      marketDate: marketDate,
    };
  };
  useEffect(() => {
    console.log("tableItem - isupdated use effect called");
    if (!mountedRef2.current) {
      mountedRef2.current = true;
      return;
    }
    if (props.isUpdated) {
      setDelete(false);
      setNew(false);
      setModified(false);
    }
  }, [props.isUpdated]);
  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    const warn = name === "" || catalogNumber == undefined;
    setWarning(warn);
    props.formWarn(warn);
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
      props.deleteItem(props._id, getItem());
    } else {
      props.abortDeleteItem(props._id);
    }
  }, [isDeleted]);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      if (props.newItem) {
        setNew(true);
      }
      return;
    }
  }, []);
  return (
    <tr
      style={{
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease",
        backgroundColor: isDeleted
          ? "red"
          : newItem
          ? "green"
          : isModified
          ? "orange"
          : "white",
      }}
    >
      {/* id -  read only */}
      <td>{props.id}</td>
      <td>
        {editEnabled ? (
          <Input
            required={true}
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
          <IconButton type="submit" onClick={() => setEdit(!editEnabled)}>
            {formWarning ? (
              <Warning color="danger" />
            ) : editEnabled ? (
              <Done />
            ) : (
              <Edit />
            )}
          </IconButton>
          <IconButton onClick={() => setDelete(!isDeleted)}>
            {isDeleted ? <Add /> : <Delete />}
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
