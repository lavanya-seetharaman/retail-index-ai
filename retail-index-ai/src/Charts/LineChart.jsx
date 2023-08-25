import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [chart, setChart] = useState([]);
  const [value, setValue] = useState({
    startDate: dayjs(new Date()),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  let data = "";

  const fetchPredict = (e) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://ret1--sankarannamalai.repl.co/predict/?start_date=${value.startDate}&end_date=${value.endDate}`,
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setChart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const labels = chart?.predictions?.map((x) => dayjs(x.date).format("DD"));
  const chartdata = {
    labels: labels,
    datasets: [
      {
        label: "Predicated Sales Values",
        data: chart?.predictions?.map((x) => x.predicted_sales),
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
    data: chartdata,
    maintainAspectRatio: true,
    scales: {},
    legend: {
      labels: {
        fontFamily: "Raleway",
        fontSize: 25,
      },
    },
  };
  return (
    <div>
      <div className="flex flex-row">
        {" "}
        <Datepicker
          showShortcuts={true}
          showFooter={true}
          value={value}
          onChange={handleValueChange}
        />
        <button onClick={fetchPredict}>Predict</button>
      </div>

      <div className="w-[1200px]">
        <Line options={config} data={chartdata} />
      </div>
    </div>
  );
}

export default BarChart;
