const API_KEY = '02d484f8c36c50fc74d9e6131549ff5e';

export const getOpenWeaherLink = (cidade : string) => {
 return `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}&lang=pt_br`;
}



export const weatherClassfication = (weather : "Clear"| "Clouds" | "Mist" | "Rain" | "Snow" ) => {

const imagens = {
    Clear: require('./assets/clear.png'),
    Clouds: require('./assets/cloud.png'),
    Mist: require('./assets/mist.png'),
    Rain: require('./assets/rain.png'),
    Snow: require('./assets/snow.png'),
};

return imagens[weather] ? imagens[weather] : imagens['Clouds']
};

export const translateWeather = (weather : "Clear"| "Clouds" | "Mist" | "Rain" | "Snow" ) => {

    const traducao = {
        Clear: 'Claro',
        Clouds: 'Nublado',
        Mist: 'Nevoeiro',
        Rain: 'Chuvoso',
        Snow: 'Nevando',
    };
    
    return traducao[weather] ? traducao[weather] : "Não Informado";
    }