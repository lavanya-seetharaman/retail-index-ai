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
import BarChart from "./BarChart";
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

function LineChart() {
  const [chart, setChart] = useState([]);
  const [chartType, setChartType] = useState(false);
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
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
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
      <div className="flex flex-row ">
        {" "}
        <Datepicker
          showShortcuts={true}
          showFooter={true}
          value={value}
          onChange={handleValueChange}
          className="w-5"
        />
        <button onClick={fetchPredict}>Predict</button>
      </div>
      {/* <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={chartType}
            onChange={(e) => setChartType(!chartType)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Bar Chart
          </span>
        </label>
      </div> */}

      {/* {chart.length && chartType ? (
        <div className="w-[1200px]">
          <BarChart chart={chart} />
        </div>
      ) : (
        <div className="w-[1200px]">
          <Line data={chartdata} options={config} />
        </div>
      )} */}
      <div className="w-[1200px]">
        <Line data={chartdata} options={config} />
      </div>
    </div>
  );
}

export default LineChart;
