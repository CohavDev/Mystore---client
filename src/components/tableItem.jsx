import { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { Edit, Delete, Close } from "@mui/icons-material";
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
  useEffect(() => {});
  return (
    <tr>
      {/* id -  read only */}
      <td>{props.id}</td>
      <td>
        {editEnabled ? (
          <Input
            required
            placeholder="Item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            slotProps={{ input: { maxlength: 50 } }}
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
          <Select defaultValue={type}>
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
          <IconButton>
            <Delete />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
