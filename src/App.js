import { Box, Button } from "@mui/joy";
import SearchBox from "./components/searchBox";
import StoreTable from "./components/storeTable";
import AlertDialogModal from "./components/modalCancel";
import logo from "./logo.svg";
import { Add, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
// import "./App.css";

function App() {
  const [isModified, setModified] = useState(false);
  const [saveClick, toggleSave] = useState(false);
  const [cancelClick, toggleCancel] = useState(false);
  const [newItemClick, setNewClick] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    if (!isLoading) {
      toggleSave(false);
    }
  }, [isLoading]);
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: 25 }}>
          {cancelClick ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingTop: "10%",
              }}
            >
              <h2>You are logged out</h2>
              <h3>any changes you have made were canceled</h3>
              <Button onClick={() => toggleCancel(false)}>Log in</Button>
            </Box>
          ) : (
            <>
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
                  <Button
                    onClick={() => setNewClick(!newItemClick)}
                    startDecorator={<Add />}
                  >
                    Add Item
                  </Button>
                  <Button
                    loading={isLoading}
                    disabled={!isModified}
                    color="success"
                    startDecorator={<Save />}
                    onClick={() => toggleSave(true)}
                  >
                    Save
                  </Button>
                  <AlertDialogModal callbackExit={() => toggleCancel(true)} />
                </Box>
              </Box>
              <SearchBox callBackSetData={setSearchData} />
              <StoreTable
                isLoadingCallback={setLoading}
                saveClick={saveClick}
                cancelClick={cancelClick}
                newItemClick={newItemClick}
                setModified={(change) => setModified(change)}
                searchData={searchData}
              />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
