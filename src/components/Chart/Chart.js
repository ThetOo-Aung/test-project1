import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../api";
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2";
// import { Line } from 'react-chartjs-2'

const Chart = ({ response: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchApi();
  }, []);

  const barChart = () => {
    return confirmed ? (
      <Bar
        data={{
          labels: ["Infected", "Recovery", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current State in ${country}` },
        }}
      />
    ) : (
      "null"
    );
  };

  const lineChart = () => {
    return dailyData ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      ></Line>
    ) : null;
  };

  return (
    <div className={styles.container}>{country ? barChart() : lineChart()}</div>
  );
};

export default Chart;
