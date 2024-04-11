# Weather Application

### Features:
- Uses js location object to get the user's device location.
- Sends device coordinates to a weather API (api.weather.com).
- Returns a JSON object, which is then used to populate current weather data for the user.
- Based on certain conditions I thought of, a random image is gotten from an image api (unsplash.com) based on the conditions listed below.


### Conditions:
```
if(data.current.uv > 7){
    // get image with query 'sunny'
}else if(data.current.precip_in > 2){
    // get image with query 'rainy'
}else if(data.current.vis_miles < 1){
    // get image with query 'foggy'
}else if(data.current.temp_f < 50){
    // get image with query 'cold'
}else {
    // get image with query 'landscape'
}
```

### Notes:
- Application uses pre-made loader from `css-loaders.com`.


