import { Box, Button, Input } from "@mui/joy";
import { Search } from "@mui/icons-material";

export default function SearchBox() {
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
        startDecorator={<Search />}
        endDecorator={<Button>Search</Button>}
        sx={{ width: "30%" }}
      />
    </Box>
  );
}
