const parentContainer = document.querySelector(".main");

function loadJson( url ) {
    return fetch( url )
        .then( response => {
            if ( response.status == 200 ) {
                return response.json();
            } else {
                throw new Error( `${response.status}: ${response.statusText}` );
            }
        } )
}


function getWeatherInfo( city ) {
    return loadJson( `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fbba44475f0c7199949d7e172d54ef98&units=metric`)
        .then( currentWeather => {
            const { name, main: { temp: currentTemperature }, weather : [ { main: condition } ] } = currentWeather;
            displayWeatherInfo( name, Math.floor( currentTemperature ) , condition );
        } )
        .catch( err => {
            alert( err );
        } );
}

getWeatherInfo( "cdjsfdfzskdsjkdskj" );

function displayWeatherInfo( cityName, degrees, condition ) {
    let cityDiv = document.createElement( "div" );
    let nameHeader = document.createElement( "h4" );
    let weatherInfoDiv = document.createElement( "div" );
    let degreesSpan = document.createElement( "span" );
    let conditionSpan = document.createElement( "span" );

    weatherInfoDiv.className = "weather-info";
    cityDiv.className = "city-weather";
    degreesSpan.className = "degrees";
    conditionSpan.className = "condition";

    nameHeader.innerHTML = cityName;
    degreesSpan.innerHTML = `${degrees}°`;
    conditionSpan.innerHTML = condition;

    weatherInfoDiv.appendChild( degreesSpan );
    weatherInfoDiv.appendChild( conditionSpan );

    cityDiv.appendChild( nameHeader );
    cityDiv.appendChild( weatherInfoDiv );
    parentContainer.appendChild( cityDiv );
}
