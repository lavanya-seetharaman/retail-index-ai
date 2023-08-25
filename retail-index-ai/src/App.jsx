import { useState } from "react";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>Retail Sales Predictions Powered by Machine Learning</h3>
      <LineChart />
      {/* <p className="read-the-docs">
        Designed and Powered by Blackwins Tech Solutions
      </p> */}
    </>
  );
}

export default App;
