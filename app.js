window.addEventListener('load', () => {
  let long;
  let lat;

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
        })
    });
  }
});