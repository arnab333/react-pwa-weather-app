import axios from 'axios';
import { Fragment, useState, useEffect } from 'react';
import { fetchWeather } from './api/fetch-weather';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get('/api/get-openweathermap-key')
      .then((response) => {
        setApiKey(response.data.key);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSearch = async (e) => {
    if (e?.key === 'Enter') {
      const data = await fetchWeather({ q: cityName, appid: apiKey });

      setWeather(data);
      setCityName('');
    }
  };

  return (
    <Fragment>
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={cityName}
          onChange={(e) => setCityName(e.currentTarget.value)}
          onKeyPress={onSearch}
        />
        {weather?.main && (
          <Fragment>
            <div className="city">
              <h2 className="city-name">
                <span>{weather?.name}</span>
                <sup>{weather?.sys?.country}</sup>
              </h2>
              <div className="city-temp">
                {Math.round(weather?.main?.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img
                  className="city-icon"
                  src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
                  alt={weather?.weather?.[0]?.description}
                />
                <p>{weather?.weather?.[0]?.description}</p>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default App;
