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

const rain = require('../assets/weathericons/128/rain.png')
const rain_day = require('../assets/weathericons/128/overcast-day-rain.png')
const rain_night = require('../assets/weathericons/128/overcast-night-rain.png')

const drizzle = require('../assets/weathericons/128/drizzle.png')
const drizzle_day = require('../assets/weathericons/128/overcast-day-drizzle.png')
const drizzle_night = require('../assets/weathericons/128/overcast-night-drizzle.png')

const fog = require('../assets/weathericons/128/fog.png')
const fog_day = require('../assets/weathericons/128/partly-cloudy-day-fog.png')
const fog_night = require('../assets/weathericons/128/partly-cloudy-night-fog.png')

const snow = require('../assets/weathericons/128/snow.png')
const snow_day = require('../assets/weathericons/128/overcast-day-snow.png')
const snow_night = require('../assets/weathericons/128/overcast-night-snow.png')

const thunder = require('../assets/weathericons/128/thunderstorms.png')
const thunder_day = require('../assets/weathericons/128/thunderstorms.png')
const thunder_night = require('../assets/weathericons/128/thunderstorms.png')

const thunder_rain = require('../assets/weathericons/128/thunderstorms-rain.png')
const thunder_rain_day = require('../assets/weathericons/128/thunderstorms-day-rain.png')
const thunder_rain_night = require('../assets/weathericons/128/thunderstorms-night-rain.png')

const hail = require('../assets/weathericons/128/hail.png')
const hail_day = require('../assets/weathericons/128/partly-cloudy-day-hail.png')
const hail_night = require('../assets/weathericons/128/partly-cloudy-night-hail.png')

const snowflake = require('../assets/weathericons/128/snowflake.png')

const cloudy = require('../assets/weathericons/128/cloudy.png')
const cloudy_day = require('../assets/weathericons/128/partly-cloudy-day.png')
const cloudy_night = require('../assets/weathericons/128/partly-cloudy-night.png')

const humidity = require('../assets/weathericons/128/humidity.png')
const compass = require('../assets/weathericons/128/compass.png')
const wind_strong = require('../assets/weathericons/128/windsock.png')
const wind_weak = require('../assets/weathericons/128/windsock-weak.png')

export function TodayWeather({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [minTemp, setminTemp] = useState(null);
  const [maxTemp, setmaxTemp] = useState(null);
  const [precipitaProb, setprecipitaProb] = useState(null);
  const [windDir, setwindDir] = useState(null);
  const [windStrenght, setwindStrenght] = useState(null);
  const [windStrenghtImage, setwindStrenghtImage] = useState(null);
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
          changeWindStrenght(json.data[0].classWindSpeed)
          setweatherType(json.data[0].idWeatherType)
          setweatherTypeText(weather_ids.get(json.data[0].idWeatherType.toString()))
          changeImage(json.data[0].idWeatherType)
        })
        .catch((error) => { console.error(error) });
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
          changeWindStrenght(json.data[0].classWindSpeed)
          changeImage(json.data[0].idWeatherType)
        })
        .catch((error) => {
          console.error(error)
        });
      console.log("it was null")
      setLoading(false)
    }
  }

  function changeWindStrenght(int) {
    switch (int) {
      case 1:
        setwindStrenght("Fraco")
        setwindStrenghtImage(wind_weak)
        break;
      case 2:
        setwindStrenght("Moderado")
        setwindStrenghtImage(wind_weak)
        break;
      case 3:
        setwindStrenght("Forte")
        setwindStrenghtImage(wind_strong)
        break;
      case 4:
        setwindStrenght("Muito Forte")
        setwindStrenghtImage(wind_strong)
        break;
    }
  }

  function changeImage(int) {
    let now = new Date;
    let hours = now.getHours();
    switch (int) {
      case 0:
        setweatherImage(no_info)
        break;
      case 1:
        if (hours < 6 || hours >= 20) {
          setweatherImage(clear_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(clear_day)
        }
        break;
      case 2:
        if (hours < 6 || hours >= 20) {
          setweatherImage(partly_cloudy_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(partly_cloudy_day)
        }
        break;
      case 3:
        if (hours < 6 || hours >= 20) {
          setweatherImage(overcast_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(overcast_day)
        }
        break;
      case 4:
        if (hours < 6 || hours >= 20) {
          setweatherImage(overcast_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(overcast_day)
        }
        break;
      case 5:
        if (hours < 6 || hours >= 20) {
          setweatherImage(overcast_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(overcast_day)
        }
        break;
      case 6:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 7:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 8:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 9:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 10:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 11:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 12:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 13:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 14:
        if (hours < 6 || hours >= 20) {
          setweatherImage(rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(rain_day)
        }
        break;
      case 15:
        if (hours < 6 || hours >= 20) {
          setweatherImage(drizzle_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(drizzle_day)
        }
        break;
      case 16:
        if (hours < 6 || hours >= 20) {
          setweatherImage(fog_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(fog_day)
        }
        break;
      case 17:
        if (hours < 6 || hours >= 20) {
          setweatherImage(fog_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(fog_day)
        }
        break;
      case 18:
        if (hours < 6 || hours >= 20) {
          setweatherImage(snow_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(snow_day)
        }
        break;
      case 19:
        if (hours < 6 || hours >= 20) {
          setweatherImage(thunder_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(thunder_day)
        }
        break;
      case 20:
        if (hours < 6 || hours >= 20) {
          setweatherImage(thunder_rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(thunder_rain_day)
        }
        break;
      case 21:
        if (hours < 6 || hours >= 20) {
          setweatherImage(hail_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(hail_day)
        }
        break;
      case 22:
        setweatherImage(snowflake)
        break;
      case 23:
        if (hours < 6 || hours >= 20) {
          setweatherImage(thunder_rain_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(thunder_rain_day)
        }
        break;
      case 24:
        if (hours < 6 || hours >= 20) {
          setweatherImage(cloudy_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(cloudy_day)
        }
        break;
      case 25:
        if (hours < 6 || hours >= 20) {
          setweatherImage(cloudy_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(cloudy_day)
        }
        break;
      case 26:
        if (hours < 6 || hours >= 20) {
          setweatherImage(fog_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(fog_day)
        }
        break;
      case 27:
        if (hours < 6 || hours >= 20) {
          setweatherImage(cloudy_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(cloudy_day)
        }
        break;
      case 28:
        if (hours < 6 || hours >= 20) {
          setweatherImage(snow_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(snow_day)
        }
        break;
      case 29:
        if (hours < 6 || hours >= 20) {
          setweatherImage(snow_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(snow_day)
        }
        break;
      case 30:
        if (hours < 6 || hours >= 20) {
          setweatherImage(snow_night)
        } else if (hours >= 6 && hours < 20) {
          setweatherImage(snow_day)
        }
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

    humidity_box: {
      backgroundColor: 'white',
      color: 'white',
      borderRadius: 10,
      padding: 5,
    },

    wind_direction_box: {
      backgroundColor: 'white',
      color: 'white',
      borderRadius: 10,
      padding: 5,
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
      <View style={{ alignContent: 'space-between', flexDirection: 'row', top: 1 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'white', borderRadius: 5, padding: 2, }}>Dados IPMA ©{year}</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#B58A80', justifyContent: 'center' }}>

        {loading ? (
          <ActivityIndicator
            visible={loading}
            textContent={'A carregar...'}
            textStyle={{}}
          />
        ) : (
          <>
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
            <View style={[styles.text_view, { alignContent: 'space-between', justifyContent: 'space-around', flexDirection: 'column', top: 5 }]}>

              <View style={[styles.humidity_box, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 5 }]}>
                <Image source={humidity} style={{ width: 35, height: 35 }} />
                <Text style={{ paddingRight: 5 }} > Probablidade de Percipitação: {precipitaProb}%</Text>
              </View>

              <View style={[styles.wind_direction_box, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 4, top: 10 }]}>
                <Image source={windStrenghtImage} style={{ width: 30, height: 30 }} />
                <Text style={{ paddingRight: 5 }}>Força do Vento: {windStrenght}</Text>
              </View>

              <View style={[styles.wind_direction_box, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5, top: 15 }]}>
                <Image source={compass} style={{ width: 30, height: 30 }} />
                <Text style={{ paddingRight: 5 }}>Direção do vento: {windDir}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}