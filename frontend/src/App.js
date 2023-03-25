import "./App.css";
import { Navbar } from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Allroutes from "./routes/Allroutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Allroutes />
    </div>
  );
}

export default App;
