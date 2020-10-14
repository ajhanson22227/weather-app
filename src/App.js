import React, {useEffect, useState} from 'react';

const config = require('./config.js');
const apiKey = config.weatherAPIKey;

const App = () => {
    const [cityName, setCityName]       = useState('Fargo');
    const [countryName, setCountryName]  = useState('us');
    const [tempUnit, setTempUnit]       = useState('imperial');
    const [temp, setTemp]               = useState('');

    async function getWeather(){
        try{
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=${tempUnit}&APPID=${apiKey}`, {mode: 'cors'});
            const weatherData = await response.json();
            console.log(weatherData);
            setTemp(Math.round(weatherData.main.temp))
        }
        catch(error){
            console.log(error)
        }
    }

    const handleClick = () => {
        tempUnit === 'imperial' ? setTempUnit('metric') : setTempUnit('imperial');
        getWeather();
    }

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.nameField.value)
        setCityName(event.target.nameField.value)
        getWeather();
    }

    return (
        <div>
            <div>{cityName},{countryName} and boy is it {temp} {tempUnit === 'imperial' ? 'F' : 'C'}</div>
            <form onSubmit={handleSearch}>
                <label>Searchy</label>
                <input 
                    placeholder='City Name'
                    name='nameField'
                    // onChange={(e) => setCityName(e.target.value)}
                />
                <button>Search</button>
            </form>
            <button onClick={handleClick}>unit</button>
        </div>
    );
}

export default App;