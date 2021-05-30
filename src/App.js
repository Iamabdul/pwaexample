import React, { useState } from 'react';
import FetchWeather, { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if(e.key === 'Enter'){
            const data = await fetchWeather(query);
            setWeather(data); // the setWeather is sort of assigning the weather variable in line 7 to the data coming in.
            setQuery(''); // similarly here but it's a string. The query and weather variables are accessible globally. This action is to just reste the query.
            // we needed to do this since data in the search function is local in this scope only.
        }
    }
    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="search a place!"
                value = {query}
                onChange = {(event) => setQuery(event.target.value)}
                onKeyPress = { search }
            />

            {weather.main && ( //this is checking if the weather.main exists, then it goes to the next segmetn of the condition (which in our case seems to be an action)
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default App; // this is so we can use this App outside and let other files import it