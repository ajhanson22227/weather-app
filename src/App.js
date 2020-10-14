import React, {useEffect, useState} from 'react';

const config = require('./config.js');
const apiKey = config.weatherAPIKey;

const App = () => {
    const [cityName, setCityName]       = useState('Fargo');
    const [countryName, setCountryName]  = useState('us');
    const [tempUnit, setTempUnit]       = useState('imperial');
    const [temp, setTemp]               = useState('');

    async function getWeather(){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=${tempUnit}&APPID=${apiKey}`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        setTemp(Math.round(weatherData.main.temp))
    }

    useEffect( () => {
        getWeather();
    }, [cityName, countryName, tempUnit])
    
    const handleClick = () => {
        tempUnit === 'imperial' ? setTempUnit('metric') : setTempUnit('imperial');
    }

    return (
        <div>
            <div>{cityName} is {} {countryName} and boy is it {temp} {tempUnit === 'imperial' ? 'F' : 'C'}</div>
            <button onClick={handleClick}>Unit</button>
        </div>
    );
}

export default App;