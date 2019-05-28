window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const API = `${proxy}https://api.darksky.net/forecast/2e10591c484c241313bcb6324dd5cedc/${lat},${long}`;

      //This API does not work with localhost, to bypass this CORS issue, use services like cors-anywhere.heroku.com

      fetch(API)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          //Accessing Data
          const { temperature, summary, icon } = data.currently;

          //Set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);
          let fahrenheit = (celsius * (9 / 5)) + 32;

          setIcons(icon, document.querySelector(".icon"));

          //Change F to C and C to F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.ceil(celsius);
            }
            else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.ceil(fahrenheit);
            }
          })
        })
    });
  }
  else {
    window.alert("Please Enable Location Access in Your Browser");
  }

  //Add Skycons

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();//Look for every - and replace it with _
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }


  //Change to Celsius
  // function toCelsius() {
  //   temperatureSection.addEventListener('click', () => {
  //     if (temperatureSpan.textContent === "F") {
  //       temperaatureSpan.textContent = "C";
  //     }
  //     else {
  //       temperatureSpan.textContent = "F";
  //     }
  //   }
  // });
});