import React, { useEffect, useState } from "react";
import nullMood from "../assets/null_mood.png";
import sun from "../assets/sun.png";
import snow from "../assets/snow.png";
// import umbrella from "../assets/umbrella.png";
import storm from "../assets/storm.png";
// import lightning from "../assets/lightning.png";
import windHeading from "../assets/windy_heading.png";
import humidityHeading from "../assets/humidity_heading.png";
import rainHeading from "../assets/rain_heading.png";
import pin from "../assets/pin.png";
import haze from"../assets/haze.png";

const Weather = () => {
  const [weatherMood, setweatherMood] = useState();
  const [searchValue, setsearchValue] = useState("Bhopal");
  const [tempInfo, settempInfo] = useState({});
  const [advice, setadvice] = useState("")

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=b89ddbcb8825a77b37889b8020f1f49c`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { name } = data;
      const { speed } = data.wind;
      const description = data.weather[0].description;
      const visibility = data.visibility;
      const main = data.weather[0].main;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        name,
        speed,
        description,
        visibility,
        main,
      };
      settempInfo(myNewWeatherInfo);
      SetWeatherImage(main);
      SetAdvice(main);
      console.log(tempInfo.main)
    } catch (error) {
      console.log(error);
    }
  };

  const SetWeatherImage = (main) => {
    if (main === "Rain") {
      setweatherMood(storm);
    } else if (main === "Snow") {
      setweatherMood(snow);
    }
    else if(main==="Clear"){
      setweatherMood(sun);
    }
    else if(main==="Haze"){
      setweatherMood(haze
        );
    }
  };
  const SetAdvice=(main)=>{
    if (main === "Rain") {
      setadvice("Grab an umbrella and waterproof jacket. Consider staying indoors if it's heavy rain");
    } else if (main === "Snow") {
      setadvice("Bundle up in layers, wear a warm coat, and don't forget gloves. Check road conditions before heading out.");
    }
    else if(main==="Clear"){
      setadvice("Enjoy the sunshine! Dress comfortably, but bring sunglasses and sunscreen for UV protection");
    }
    else if(main==="Haze"){
      setadvice("Hazy vibes today! Grab your shades, keep it casual with comfy clothes, and maybe toss on a hat. If the air feels meh, consider a chill day indoors or add a touch of mystery to your outdoor adventure.");
    }
  }

  useEffect(() => {
    getWeatherInfo();
  }, );

  return (
    <div className="weather">
      <div className="hero">
        <div className="searchBar">
          <p id="title">Hello there</p>
          <p>Check the weather anywhere!</p>
          <div className="input">
            <input
              type="text"
              placeholder="Enter city "
              value={searchValue}
              onChange={(e) => {
                setsearchValue(e.target.value);
              }}
            />
            <i className="ri-search-2-line" onClick={getWeatherInfo}></i>
          </div>
        </div>
        <div className="tempDetail">
          <div className="left">
            <h1>{Math.round(tempInfo.temp)}°</h1>
          </div>
          <div className="right">
            <img src={weatherMood || nullMood} alt="" />
            <h3>{tempInfo.description} </h3>
          </div>
        </div>
        <div className="suggestion">
          <div className="loc">
            <img src={pin} alt="" />
            <p>{searchValue}</p>
          </div>
          <div className="advice">
            <p>
              {advice}
            </p>
          </div>
        </div>
        <div className="otherDetails">
          <div className="wind">
            <img src={windHeading} alt="" />
            <p>Wind Speed</p>
            <p className="para2">{tempInfo.speed} km/h</p>
          </div>
          <div className="humidity">
            <img src={humidityHeading} alt="" />
            <p>Humidity</p>
            <p className="para2">{tempInfo.humidity} %</p>
          </div>
          <div className="precipitation">
            <img src={rainHeading} alt="" />
            <p>Visibilty</p>
            <p className="para2">{tempInfo.visibility} m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
