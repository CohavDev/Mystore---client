import { Box, Button, Input } from "@mui/joy";
import { Search } from "@mui/icons-material";
import searchItem from "../services/searchItem";
import { useState } from "react";

export default function SearchBox(props) {
  const [searchTerm, setTerm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    if (searchTerm === "") {
      props.callBackSetData({});
      setTimeout(() => setLoading(false), 1500);
      return;
    }
    const result = await searchItem(searchTerm);
    setTimeout(() => setLoading(false), 1500);
    props.callBackSetData(result);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Input
        placeholder="Search for a name"
        onChange={(event) => setTerm(event.target.value)}
        startDecorator={<Search />}
        endDecorator={
          <Button loading={isLoading} onClick={handleClick}>
            Search
          </Button>
        }
        sx={{ width: "30%" }}
      />
    </Box>
  );
}
