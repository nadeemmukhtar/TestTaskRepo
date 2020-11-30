import "./App.css";
import Routes from "./routes";
import axios from "axios";
function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
  }
  axios.defaults.baseURL = "https://ror-test-task.herokuapp.com";

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
