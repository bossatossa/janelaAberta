import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { weather_ids } from "../const";

const no_info = require('../assets/weathericons/128/not-available.png')
const clear_day = require('../assets/weathericons/128/clear-day.png')
const clear_night = require('../assets/weathericons/128/clear-night.png')
const partly_cloudy_night = require('../assets/weathericons/128/partly-cloudy-night.png')
const partly_cloudy_day = require('../assets/weathericons/128/partly-cloudy-day.png')
const overcast_day = require('../assets/weathericons/128/overcast-day.png')
const overcast_night = require('../assets/weathericons/128/overcast-night.png')
const overcast_rain_day = require('../assets/weathericons/128/overcast-day-rain.png')
const overcast_rain_night = require('../assets/weathericons/128/overcast-night-rain.png')
const rain = require('../assets/weathericons/128/rain.png')
const drizzle = require('../assets/weathericons/128/drizzle.png')
const fog = require('../assets/weathericons/128/fog.png')
const snow = require('../assets/weathericons/128/snow.png')
const thunder = require('../assets/weathericons/128/thunderstorms.png')
const thunder_rain = require('../assets/weathericons/128/thunderstorms-rain.png')
const hail = require('../assets/weathericons/128/hail.png')
const snowflake = require('../assets/weathericons/128/snowflake.png')
const cloudy = require('../assets/weathericons/128/cloudy.png')

export function TodayWeather({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [minTemp, setminTemp] = useState(null);
  const [maxTemp, setmaxTemp] = useState(null);
  const [precipitaProb, setprecipitaProb] = useState(null);
  const [windDir, setwindDir] = useState(null);
  const [weatherType, setweatherType] = useState(null);
  const [weatherTypeText, setweatherTypeText] = useState(null);
  const [weatherImage, setweatherImage] = useState(null);
  const year = useState(new Date().getFullYear());

  async function getWeather() {
    let used_id;
    let used_name;
    const stored_id = await AsyncStorage.getItem('location_id')
    const stored_name = await AsyncStorage.getItem('location_name')
    if (stored_id != null) {
      // location set
      used_id = stored_id;
      used_name = stored_name;
      setName(used_name)
      setId(stored_id)
      console.log("it aint null")

      fetch('http://api.ipma.pt/open-data/forecast/meteorology/cities/daily/' + stored_id + '.json')
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data[0])
          setminTemp(Math.round(json.data[0].tMin))
          setmaxTemp(Math.round(json.data[0].tMax))
          setprecipitaProb(json.data[0].precipitaProb)
          setwindDir(json.data[0].predWindDir)
          setweatherType(json.data[0].idWeatherType)
          setweatherTypeText(weather_ids.get(json.data[0].idWeatherType.toString()))
          changeImage(json.data[0].idWeatherType)
        })
        .catch((error) => console.error(error));
        setLoading(false)

    } else {
      // default location
      used_id = "1151200"
      used_name = "Setúbal"
      setName(used_name)
      setId(used_id)
      fetch('http://api.ipma.pt/open-data/forecast/meteorology/cities/daily/' + used_id + '.json?' + Math.random())
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data[0])
          setminTemp(json.data[0].tMin)
          setmaxTemp(json.data[0].tMax)
          setprecipitaProb(json.data[0].precipitaProb)
          setwindDir(json.data[0].predWindDir)
          setweatherType(json.data[0].idWeatherType)
          setweatherTypeText(weather_ids.get(json.data[0].idWeatherType.toString()))
          changeImage(json.data[0].idWeatherType)
        })
        .catch((error) => console.error(error));
      console.log("it was null")
      setLoading(false)
    }
  }

  function changeImage(int) {
    let now = new Date;
    let hours = now.getUTCHours()
    console.log(hours);

    switch (int) {
      case 0:
        setweatherImage(no_info)
        break;
      case 1:
        if (hours >= 20) {
          setweatherImage(clear_night)
        } else if (hours > 6 && hours < 20) {
          setweatherImage(clear_day)
        }
        break;
      case 2:
        if (hours >= 20) {
          setweatherImage(partly_cloudy_night)
        } else if (hours > 6 && hours < 20) {
          setweatherImage(partly_cloudy_day)
        }
        break;
      case 3:
        if (hours >= 20) {
          setweatherImage(overcast_night)
        } else if (hours > 6 && hours < 20) {
          setweatherImage(overcast_day)
        }
        break;
      case 4:
        if (hours >= 20) {
          setweatherImage(overcast_night)
        } else if (hours > 6 && hours < 20) {
          setweatherImage(overcast_day)
        }
        break;
      case 5:
        if (hours >= 20) {
          setweatherImage(overcast_night)
        } else if (hours > 6 && hours < 20) {
          setweatherImage(overcast_day)
        }
        break;
      case 6:
        setweatherImage(rain)
        break;
      case 7:
        setweatherImage(rain)
        break;
      case 8:
        setweatherImage(rain)
        break;
      case 9:
        setweatherImage(rain)
        break;
      case 10:
        setweatherImage(rain)
        break;
      case 11:
        setweatherImage(rain)
        break;
      case 12:
        setweatherImage(rain)
        break;
      case 13:
        setweatherImage(rain)
        break;
      case 14:
        setweatherImage(rain)
        break;
      case 15:
        setweatherImage(drizzle)
        break;
      case 16:
        setweatherImage(fog)
        break;
      case 17:
        setweatherImage(fog)
        break;
      case 18:
        setweatherImage(snow)
        break;
      case 19:
        setweatherImage(thunder)
        break;
      case 20:
        setweatherImage(thunder_rain)
        break;
      case 21:
        setweatherImage(hail)
        break;
      case 22:
        setweatherImage(snowflake)
        break;
      case 23:
        setweatherImage(thunder_rain)
        break;
      case 24:
        setweatherImage(cloudy)
        break;
      case 25:
        setweatherImage(cloudy)
        break;
      case 26:
        setweatherImage(fog)
        break;
      case 27:
        setweatherImage(cloudy)
        break;
      case 28:
        setweatherImage(snow)
        break;
      case 29:
        setweatherImage(snow)
        break;
      case 30:
        setweatherImage(snow)
        break;
    }
  }

  const styles = StyleSheet.create({
    mintemp_box: {
      backgroundColor: '#0080b0',
      color: 'white',
      borderRadius: 10,
      fontSize: 25,
      padding: 10,
      fontWeight: 'bold'
    },
    maxtemp_box: {
      backgroundColor: '#Ee5b3e',
      color: 'white',
      borderRadius: 10,
      fontSize: 25,
      padding: 10,
      fontWeight: 'bold'
    },

    text_view: {
      alignContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column'
    },

    text: {
      color: 'white'
    },

    text_weather_type: {
      color: 'white',
      paddingBottom: 20,
      fontSize: 17,
      fontWeight: 'bold'
    },

    text_localidade: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold'
    },



  })


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWeather();
      console.log('gettin weather')
    });
    return unsubscribe;
  }, [navigation]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#90bfd2', justifyContent: 'center' }}>

        {loading ? (
          <ActivityIndicator
            visible={loading}
            textContent={'A carregar...'}
            textStyle={{}}
          />
        ) : (
          <>
          <View style={{ alignContent: 'space-between', flexDirection: 'row',  }}>
            <Text style={{ color: 'black', fontWeight: 'bold', bottom: 150 , backgroundColor: 'white',borderRadius: 5, padding: 2,}}>Dados IPMA ©{year}</Text>
          </View>
            <View style={styles.text_view}>
              <Text style={styles.text_localidade} >{name}</Text>
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <Image
                source={weatherImage}
              />
            </View>
            <View style={styles.text_view}>
              <Text style={styles.text_weather_type}>{weatherTypeText}</Text>
            </View>
            <View style={{ alignContent: 'space-between', justifyContent: 'space-around', flexDirection: 'row' }}>
              <Text style={styles.mintemp_box}>{minTemp}℃</Text>
              <Text style={styles.maxtemp_box}>{maxTemp} ℃</Text>
            </View>
            <View style={styles.text_view}>
              <Text style={[styles.text, { paddingBottom: 5, paddingTop: 10 }]}>Probablidade de Percipitação: {precipitaProb}%</Text>
              <Text style={[styles.text, { paddingTop: 5 }]}>Direção do vento: {windDir}</Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}