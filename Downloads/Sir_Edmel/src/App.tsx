import MyModal from "./MyModal";
import "./App.css";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <button className="open-button" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <MyModal open={open} onClose={() => setOpen(false)} />
      <h1>Hi</h1>
    </div>
  );
}

export default App;
