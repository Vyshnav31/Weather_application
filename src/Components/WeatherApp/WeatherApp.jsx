import React, { useState } from "react";
import "../WeatherApp/WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import cloud from "../Assets/WeatherIcons.gif";
import Clock from "react-live-clock";
import sun from "../Assets/sun.png";
const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  };
const WeatherApp = () =>{
    let api_key="1191e67d98a083d9a4845cf5f295502d";
    const [wicon,setWicon]=useState(cloud);
    const search =async() =>{
        const element=document.getElementsByClassName("cityInput");
        if(element[0].value ===""){
            return 0;
        }
        
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let response=await fetch(url);
        let data=await response.json();
        const humidity=document.getElementsByClassName("humidity-percentage");
        const wind=document.getElementsByClassName("wind-rate");
        const temperature=document.getElementsByClassName("weather-temp");
        const location=document.getElementsByClassName("weather-location");
        //const background=document.getElementById("container");
        const location1=document.getElementsByClassName("location");
        const tempmin=document.getElementsByClassName("tempmin");
        const tempmax=document.getElementsByClassName("tempmax");
        const pressure=document.getElementsByClassName("pressure");

        humidity[0].innerHTML=data.main.humidity+" %";
        wind[0].innerHTML=data.wind.speed+ "Km/h";
        temperature[0].innerHTML=data.main.temp+ "°C";
        location[0].innerHTML=data.name;
        location1[0].innerHTML="Location:"+data.name;
        tempmin[0].innerHTML="Temp min:"+data.main.temp_min+"°C";
        tempmax[0].innerHTML="Temp max:"+data.main.temp_max+"°C";
        pressure[0].innerHTML="Pressure:"+data.main.pressure;
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }
    }
    return(
        <div className="container">
           <h1 className="app-heading">Weather App</h1>
           <div className="dmy">
           
                <div id="txt"></div>
                <img src={sun}/>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
          <div className="topbar">
             <input type="text" className="cityInput" placeholder="Search"/>
             <div className="search-icon" onClick={()=>{search()}}>
                 <img src={search_icon} alt=""/>
             </div>
          </div>
          <div className="weather-image">
             <img src={wicon} alt=""/>
             <div className="sidewindow">
             <h3>Location Details:</h3>
             <div className="location">Location:?</div>
             <div className="tempmin">Temp min:?</div>
             <div className="tempmax">Temp max:?</div>
             <div className="pressure">pressure:?</div>
             </div>
          </div>
          <div className="weather-temp">?°C</div>
          <div className="weather-location">?</div>
          <div className="data-container">
            <div className="element">
             <img src={humidity_icon} alt="" className="icon"/>
             <div className="data">
             <div className="humidity-percentage">?%</div>
             <div className="text">Humidity</div>
             </div>
            </div>
            <div className="element">
             <img src={wind_icon} alt="" className="icon"/>
             <div className="data">
             <div className="wind-rate">?Km/h</div>
             <div className="text">Wind Speed</div>
             </div>

            </div>
          </div>
        </div>
    )
}
export default WeatherApp;