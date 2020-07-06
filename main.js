const api = {
    key: "cd1ed65a23904995903bba3dd56e09fc",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResult(searchbox.value);
    }
}

function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResult);
}

function displayResult(weather) {
    console.log(weather);
    //Get city info
    let city = document.querySelector('.location .city');
    city.innerText = (`${weather.name}, ${weather.sys.country}`)

    //Get date
    let today = new Date();
    let date ='Current Date: ' +today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+', '+ 'Current Time:' +today.getHours()+':'+today.getMinutes()+ ':'+ today.getSeconds();
    let dateDisplay = document.querySelector('.location .date');
    dateDisplay.innerText = `${date}`;

    //Get current temp
    let currentTemp = document.querySelector('.current .temp');
    currentTemp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    //Get current weather 
    const weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    //Get current feeling
    const feels = document.querySelector('.current .feels');
    feels.innerText = `Feels Like: ${weather.main.feels_like}°c`;

    //Get high low temperature
    const hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `Max: ${weather.main.temp_max}<span>°c</span>, Min: ${weather.main.temp_min}<span>°c</span>`;
}