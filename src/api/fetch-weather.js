import axios from 'axios';

const URL = `https://api.openweathermap.org/data/2.5/weather`;

export const fetchWeather = async (params) => {
  const { data } = await axios.get(URL, {
    params: { ...params, units: 'metric' },
  });

  return data;
};
