import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ chart }) {
  // const [chart, setChart] = useState([]);
  // const [value, setValue] = useState({
  //   startDate: dayjs(new Date()),
  //   endDate: new Date().setMonth(11),
  // });

  // const handleValueChange = (newValue) => {
  //   console.log("newValue:", newValue);
  //   setValue(newValue);
  // };

  // let data = "";

  // const fetchPredict = (e) => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `https://ret1--sankarannamalai.repl.co/predict/?start_date=${value.startDate}&end_date=${value.endDate}`,
  //     headers: {},
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(response.data);
  //       setChart(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  var chartdata = {
    labels: chart?.predictions?.map((x) => dayjs(x.date).format("DD")),
    datasets: [
      {
        label: `Predicated Sales Values`,
        data: chart?.predictions?.map((x) => x.predicted_sales),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
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
      <Bar options={options} data={chartdata} />
    </div>
  );
}

export default BarChart;
