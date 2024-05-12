import SearchBox from "./components/searchBox";
import StoreTable from "./components/storeTable";
import logo from "./logo.svg";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <SearchBox />
          <StoreTable />
        </div>
      </header>
    </div>
  );
}

export default App;
