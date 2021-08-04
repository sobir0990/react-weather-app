import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'ffb96f83cdd0cbde1ece5527c979d76e';

export const fetchWeather = async (query) => {
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            appid: API_KEY
        }
    });
    return data;
};

