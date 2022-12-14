import "./style/App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import useChangerBackground from "./hooks/useChangerBackground";

function App() {
  const [coords, setCords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const { bgChanger } = useChangerBackground();
  const [loading, setLoading] = useState(true);

  // ----------------------- REQUEST LOCATION API ----------------------------- \\
  useEffect(() => {
    // obj for get all we want in the cord(latitude, longitude in this case) of the nagigator location API
    const success = (pos) => {
      const objCords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCords(objCords);
    };
    // request to the navigator Geolocation API
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // ----------------------- REQUEST WEATHER API ----------------------------- \\
  useEffect(() => {
    if (coords) {
      const APIKEY = "80e10b10106bbc84b1777e040f0138ed";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;
      axios
        .get(URL)
        .then((res) => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const farenhait = ((celsius * 9) / 5 + 32).toFixed(1);
          setTemperature({ active: "celsius", celsius, farenhait });
          setWeather(res.data);
          setLoading(false);
        })
        .catch((res) => console.log("error"));
    }
  }, [coords]);

  // ----------------------- BG CHANGER ----------------------------- \\

  // ----------------------- JSX RETURN ----------------------------- \\

  return (
    <div className="App" style={bgChanger}>
      {loading ? (
        <Loader />
      ) : (
        <WeatherCard weather={weather} temperature={temperature} />
      )}
    </div>
  );
}

export default App;
