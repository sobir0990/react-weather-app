import React, {useState} from 'react';
import {fetchWeather} from "./api/fetchWeather";
import './App.css';
import get from "lodash/get";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {store} from 'react-notifications-component';

const App = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await fetchWeather(query);
                setWeather(data);
                setQuery('');
            } catch (err) {
                const message = get(err, 'response.data.message');
                store.addNotification({
                    title: 'Message',
                    message: `${message}`,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                setQuery('');
            }
        }
    };


    return (
        <div className='main-container'>
            <ReactNotification/>
            <input type="text" className='search' placeholder='Search' value={query}
                   onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
                {
                    weather.main && (
                        <div className='city'>
                            <h2 className='city-name'>
                                <span>{weather.name}</span>
                                <sup>{weather.sys.country}</sup>
                            </h2>
                            <div className='city-temp'>
                                {Math.round(weather.main.temp)}
                                <sup>&deg;C</sup>
                            </div>
                            <div className="info">
                                <img className='city-icon'
                                     src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                     alt={`${weather.weather[0].description}`}/>
                                <p>{weather.weather[0].description}</p>
                            </div>
                        </div>

                    )
                }
        </div>
    )
};

export default App;
