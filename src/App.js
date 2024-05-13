import { Box, Button } from "@mui/joy";
import SearchBox from "./components/searchBox";
import StoreTable from "./components/storeTable";
import logo from "./logo.svg";
import { Add, Save } from "@mui/icons-material";
import { useState } from "react";
// import "./App.css";

function App() {
  const [isModified, setModified] = useState(false);
  const [saveClick, toggleSave] = useState(false);
  const [cancelClick, toggleCancel] = useState(false);

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
              <Button
                disabled={!isModified}
                color="success"
                startDecorator={<Save />}
                onClick={() => toggleSave(!saveClick)}
              >
                Save
              </Button>
              <Button color="danger" onClick={() => toggleCancel(!cancelClick)}>
                Exit & Cancel
              </Button>
            </Box>
          </Box>
          <SearchBox />
          <StoreTable
            saveClick={saveClick}
            cancelClick={cancelClick}
            setModified={(change) => setModified(change)}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
