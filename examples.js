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
        } )
        .catch( err => {
            alert( err );
        } );
}

getWeatherInfo( "Cluj-Napoca" );
