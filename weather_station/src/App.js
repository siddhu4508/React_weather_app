import React from 'react';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { FontAmesomeIcon}from '@fortawesome/react-fontawesome';
import { faFrom } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function WeatherService(){
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = (date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const Weekdays = [
      'Sunday', 
      'Monday', 
      'Tuesday', 
      'Wednesday', 
      'Thursday', 
      'Friday', 
      'Saturday'
    ];  
    const currentDate = new Date();
    const date = "${weekdays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}";
    return date;
  };
  
  const search = async (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const apiKey = '8ff1db6a0dbd48a9e7acc7036b08277b';
      await axios
       .get(url, {
        params: {
          q : input,
          units: 'metric',
          appid: apiKey,
        },
       })
       .then((res) => {
        console.log(res.data);
        setWeather({data: res.data, loading: false, error: false});
       })
       .catch((error)=> {
        setWeather({...weather, data: {}, error: true});
        setInput("");
        console.error('Error fetching weather data:', error);
       });
      }
};

return (
  <div className = "App">
    <h1 className = "app-name">Weather Station</h1>
    <div className = "search-bar">
      <input
        type = "text"
        className="city-search"
        placeholder='Enter city name.."
        name = "query"
        value = {input}
        onChange = {(event) => setInput(event.target.value)}
        onKeyPress = {search}
      />
    </div>
    {weather.loading && (
    <>
       <br />
       <br />
       <Oval type="Oval" color="black" height={100} width={100} />
    </>
)}
    {weather.error && (
     <>
       <br />
       <br />
       <span ClassName ="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: "20px" }} > City not found</span>
       /span>
      </>
    )}
      {weather && weather.data && weather.data.main && (
      <div className = "city-name">
       <h2> 
        {weather.data.name}, <span>{weather.data.sys.country}</span>
      </h2>
      </div>
      <div className = "date">
      <span>{toDateFunction()}</span>
      </div>
      <div className = "icon-temp">
      <img 
          className=""
          src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
          alt={weather.data.weather[0].description}
      />
      {math.round(weather.data.main.temp)}
      <sup className="deg">&deg;C</sup>
      </div>
      <div className = "des-wind">
        <p>{weather.data.weather[0].description.toUpperCase()}</p>
        <p>Wind Speed: {weather.data.wind.speed} m/s</p>
      </div>
      </div>
    )}
  </div>
 );
}



export default WeatherService;
