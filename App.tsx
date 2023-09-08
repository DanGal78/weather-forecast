import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getOpenWeaherLink, translateWeather, weatherClassfication } from './helper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { Image } from "expo-image";
import { WeatherCard } from './WeatherCard';
 

interface WeatherType{
  wind_speed: string;
  weather_type: "Clear"| "Clouds" | "Mist" | "Rain" | "Snow";
  temp: string;
  humidity: string;
  feels_like: string;
}

export default function App() {
const [city, setCity] = useState('')
const [citySearch, setCitySearch] = useState('');
const [weather, setWeather] = useState<WeatherType | null>(null);
const [isError, setIsError] = useState(false);


  const getCityWeather = async () => {   
    try { 
    const {data:{main, weather, wind: {speed},} } = await axios.get(getOpenWeaherLink(city));
    setWeather({
      wind_speed: speed,
      weather_type: weather[0].main,
      temp: main.temp,
      humidity: main.humidity,
      feels_like: main.feels_like,
    });
    setIsError(false);
    } catch (e: any) {
      if (e.response?.status === 404) {
        setWeather(null);
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    if (city === '') return;
    getCityWeather();
  },[city]);
  return (
    <LinearGradient
      colors={['#22b3fc', '#bfbfbf']}
      style={{flex: 1,}}
    >
       <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchForm}>
          <TextInput style={styles.searchInput} value={citySearch} onChangeText={setCitySearch} />
          <Pressable style={styles.searchButton} onPress={()=> setCity(citySearch.trim())} >
            
              <Icon name="magnifying-glass" size={15} color="#900" />
            
          </Pressable>
        </View>
        {isError && (<View style={styles.weatherContent}>
          <Image source={require('./assets/404error.png')}
          contentFit="cover"
          style={styles.weatherImagem}
          />
          <Text style={{color: "#707070",
        }}>
            A cidade {" "}
            <Text style={{fontWeight: "bold",
          }}>
             '{city}'
             </Text> {" "}
            Não foi localizada em nosso base de dados
          </Text>
          </View>
        )}

        { weather && (
        <View style={styles.weatherContent}>
          <Image source={weatherClassfication(weather?.weather_type)}
          contentFit="cover"
          style={styles.weatherImagem}
          />
          <View style={styles.weatherDetails}>
            <Text style={styles.temperatura}>{weather?.temp}ºC</Text>
            <Text style={styles.type}>{translateWeather(weather?.weather_type)} </Text>
          </View>
          <View style={styles.weatherCards}>
          <WeatherCard
            iconName="water"
            description="Umidade"
            text={weather?.humidity}
            isFisrt
            />
            
          <WeatherCard
            iconName="wind"
            description="Velociade do Vento"
            text={weather?.wind_speed}
            />
            <WeatherCard
            iconName="temperature-low"
            description="Sensação Térmica"
            text={`${weather?.feels_like} ºC`}
            />

            </View>
        </View>
        )}
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  temperatura: {
    fontWeight: '700',
    fontSize: 25,
  },
  type:{
    color: '#707070',
    fontSize: 15,
    fontWeight: '700',
  },

  weatherContent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },

  weatherCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },

  weatherDetails: {
    flexDirection: 'column',
    alignItems: 'center',  
  },

  weatherImagem :{
    width: 85,
    height: 85,
  },

  searchForm: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 4,  
  },

  searchButton: {
    width:"100%",
    alignItems: "center",
    padding: 10,
    flex: 1,   
  },

  searchInput: {
    width: "85%",
    backgroundColor: "#eee",
    padding: 4,
    borderRadius: 7
  },

  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  card : {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    backgroundColor: '#f9f9fb',
    borderRadius: 7,
    boxShadow: '#000 3px 5px 10 px',
    transition: 'height 5s linear',
    marginHorizontal: 10,
  },
  cardButton: {
    padding: 5,
    border: 'nome'
  },


});
