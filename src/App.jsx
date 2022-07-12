import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Recogn from "./components/Recogn";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App bg-gray-700 h-screen">
      <Router>
        <Routes>
          <Route path="/instructor" element={<Upload />} />
          <Route path="/" element={<Recogn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
