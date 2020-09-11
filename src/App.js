import React, { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Chart from "./components/Chart/Chart";
import styles from "./App.module.css";
import { fetchData } from "./components/api";
import coronaImg from './img/image.png'

function App() {
  const [country, setCountry] = useState("");
  const url = "https://covid19.mathdro.id/api";
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      setResponse(await fetchData());
    };
    fetchApi();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    setResponse(fetchedData);
    setCountry(country);
    //set the stage
  };

  return (
    <div className={styles.container}>
    <img className={styles.image} src={coronaImg} alt="COVID-19"/>
      {response && <Cards response={response}></Cards>}
      <CountryPicker handleCountryChange={handleCountryChange}></CountryPicker>
      {response && <Chart response={response} country={country}></Chart>}
    </div>
  );
}

export default App;
