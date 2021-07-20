import React from 'react'
import { useState } from 'react'

const api = {
  key: "d3d783200f0f9f782209f1b7169290e8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [city,setCity]=useState('')
  const [weather,setWeather]=useState({})

  const search = (e) =>{
    if(e.key === 'Enter'){
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result => {
        setCity('')
        setWeather(result)
        console.log(result)
      })
    }
  }

  const currentDate = (d) => {  
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    var day = days[d.getDay()]
    var month = months[d.getMonth()]
    var year= d.getFullYear()
    var date = d.getDate()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp<18) ? 'app cold' : 'app') : 'app'}>
      <div className='search-box'>
        <input 
         type='text'
         className='search-bar'
         placeholder='Enter a city..'
         onChange={(e) => setCity(e.target.value)}
         value={city}
         onKeyPress={search}
        ></input>
      </div>
      {(typeof weather.main != "undefined") ?(
        <div>
      <div className='location-box'>
        <div className='location'>{weather.name} ,{weather.sys.country}</div>
        <div className='date'>{currentDate(new Date())}</div>
      </div>
      <div className='weather-box'>
        <div className='temp'>{Math.floor(weather.main.temp)}°c</div>
        <div className='weather'>{weather.weather[0].main}</div>
      </div>
      </div>
      ) : ('')}
    </div>
  );
}

export default App
