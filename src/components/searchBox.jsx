import { Box, Button, Input } from "@mui/joy";
import { Search } from "@mui/icons-material";

export default function SearchBox() {
  return (
    <Box display="flex" justifyContent="center">
      <Input
        placeholder="Search for a name"
        startDecorator={<Search />}
        endDecorator={<Button>Search</Button>}
      />
    </Box>
  );
}
