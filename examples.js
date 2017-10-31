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

// getWeatherInfo( "Cluj-Napoca" );



let cities = ["Arad", "Timisoara","Constanta"];

let requests = cities.map(url => loadJson( `https://api.openweathermap.org/data/2.5/weather?q=${url}&APPID=fbba44475f0c7199949d7e172d54ef98&units=metric`));

// Promise.all( requests )
// .then( weatherObjects => {
//     weatherObjects.forEach((weather)=>{
//         const { name, main: { temp: currentTemperature }, weather : [ { main: condition } ] } = weather;
//         displayWeatherInfo(name, Math.floor( currentTemperature ) , condition); 
//     }); 
// } )
// .catch( err => {
//     alert( err );
// } );

async function getWeatherInfo( city ) {
    try {
        let response = await loadJson( `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fbba44475f0c7199949d7e172d54ef98&units=metric`)
        const { name, main: { temp: currentTemperature }, weather : [ { main: condition } ] } = response;
        displayWeatherInfo( name, Math.floor( currentTemperature ) , condition );
    } catch (err) {
        alert(err);
    }
}

// getWeatherInfo( "Suceava" );


async function fetchWeather( url ) {
    const response = await fetch( url );
    return await response.json();
}

async function getWeatherInfoForCities( cities ) {
    try {
        const results = await Promise.all( cities.map( url => {
            fetchWeather( `https://api.openweathermap.org/data/2.5/weather?q=${url}&APPID=fbba44475f0c7199949d7e172d54ef98&units=metric` );
        } ) );

        // let citiesWeather = await Promise.all( weather => console.log( weather ) );
        results.forEach( city => console.log( city ) );
    } catch ( error ) {
        alert( error );
    }
}


// getWeatherInfoForCities( cities );