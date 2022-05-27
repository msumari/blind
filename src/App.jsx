import { useState } from "react";
import "./App.css";
import Recogn from "./components/Recogn";
import Upload from "./components/Upload";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App bg-gray-700 h-screen">
      <Recogn />
      <Upload />
    </div>
  );
}

export default App;
