import React, {useState} from 'react';

const config = require('./config.js');
const apiKey = config.weatherAPIKey;

const App = () => {
    const [cityName, setCityName]       = useState('Fargo');
    const [countyName, setCountryName]  = useState('us');
    const [tempUnit, setTempUnit]       = useState('imperial');
    const [temp, setTemp]               = useState('');

    async function getWeather(){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countyName}&units=${tempUnit}&APPID=${apiKey}`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        setTemp(Math.round(weatherData.main.temp))
    }
    getWeather();

    const handleClick = () => {
        tempUnit === 'imperial' ? setTempUnit('metric') : setTempUnit('imperial');
        getWeather();
    }

    return (
        <div>
            <div>{cityName} is {} {countyName} and boy is it {temp} {tempUnit === 'imperial' ? 'F' : 'C'}</div>
            <button onClick={handleClick}>Unit</button>
        </div>
    );
}

export default App;