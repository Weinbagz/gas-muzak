import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import GasTracker from "./components/gas2.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GasTracker />
    </>
  );
}

export default App;
