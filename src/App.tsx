import { useState } from "react";
import ActionWindow from "./components/ActionWindow/ActionWindow";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [zoom, setZoom] = useState<number>(1);
  return (
    <div className="app-container">
      <Navbar zoom={zoom} setZoom={setZoom} />
      <ActionWindow zoom={zoom} />
    </div>
  );
}

export default App;
