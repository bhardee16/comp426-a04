const weatherApi = 'https://api.weatherapi.com/v1/current.json?key=b69ee38c349d4c65918210310240704&';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random/?client_id=wl1BTi-gwCogAoId59lnev7DvZUsQQA0fskn8jzuIqs&count=1&query='

let location, weather;

document.getElementById('main').innerHTML = `<div class='loader'></div>`

navigator.geolocation.getCurrentPosition((res) =>{
    location = res.coords;
    console.log(location);
    getWeather(location);
}, () => {
    alert('please allow location');
});


async function getWeather(location) {
    return await fetch(new URL(weatherApi + 'q=' + location.latitude + ',' + location.longitude + '&days=1'))
    .then((response) => {
        if (response.ok) {
          return response.json()
        }else{
          return response.json().then(error => ({ error }));
        }
      }).then((data) => {
        console.log(data);
        document.getElementById('main').innerHTML = `
            <div>
                <h1>Todays weather for: <br> ${data.location.name}, ${data.location.region}</h1>
                <div id='data'>
                <p>Current temp: ${data.current.temp_f} degrees fahrenheit</p>
                <p>Feels like: ${data.current.feelslike_f} degrees fahrenheit</p>
                <p>Wind speed: ${data.current.wind_mph} mph</p>
                <p>Humidity: ${data.current.humidity}</p>
                <p>UV index: ${data.current.uv}</p>
                <p>Predicted percipitation ammount: ${data.current.precip_in} inches</p>
                <p>Visibility: ${data.current.vis_miles} miles</p>
                <p>Last updated: ${data.current.last_updated}</p>
                </div> <br>
                <p>Weather data from api.weather.com</p>
            </div>
        `
        if(data.current.uv > 7){
          getPic('sunny');
        }else if(data.current.precip_in > 2){
          getPic('rainy');
        }else if(data.current.vis_miles < 1){
          getPic('fog');
        }else if(data.current.temp_f < 50){
          getPic('cold');
        }else {
          getPic('landscape');
        }
      })
}

async function getPic(query) {
  return await fetch(new URL(unsplashApiUrl + query))
  .then((response) => {
    if (response.ok) {
      return response.json()
    }else{
      return response.json().then(error => ({ error }));
    }
  }).then((data) => {
    console.log(data)
    document.getElementById('body').style = `
    background-image: url('${data[0].urls.full + '/?client_id=wl1BTi-gwCogAoId59lnev7DvZUsQQA0fskn8jzuIqs'}');
    `
    document.getElementById('pic-loader').innerHTML = ``;
  })
}