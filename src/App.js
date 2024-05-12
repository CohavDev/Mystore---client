import { Box, Button } from "@mui/joy";
import SearchBox from "./components/searchBox";
import StoreTable from "./components/storeTable";
import logo from "./logo.svg";
import { Add, Save } from "@mui/icons-material";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: 25 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Store Items</h2>
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button startDecorator={<Add />}>Add Item</Button>
              <Button disabled startDecorator={<Save />}>
                Save
              </Button>
              <Button>Exit & Cancel</Button>
            </Box>
          </Box>
          <SearchBox />
          <StoreTable />
        </div>
      </header>
    </div>
  );
}

export default App;
