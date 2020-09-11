import Axios from "axios";
import CountryPicker from "../CountryPicker/CountryPicker";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await Axios.get(changeableUrl);
    // console.log();
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await Axios.get(`${url}/daily`);
    const resultData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return resultData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await Axios.get(`${url}/countries`);
    console.log(countries);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
