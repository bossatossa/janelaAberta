import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { local_ids, weather_ids } from "./const";

const no_info = require('./assets/weathericons/128/not-available.png')
const clear_day = require('./assets/weathericons/128/clear-day.png')
const clear_night = require('./assets/weathericons/128/clear-night.png')
const partly_cloudy_night = require('./assets/weathericons/128/partly-cloudy-night.png')
const partly_cloudy_day = require('./assets/weathericons/128/partly-cloudy-day.png')
const overcast_day = require('./assets/weathericons/128/overcast-day.png')
const overcast_night = require('./assets/weathericons/128/overcast-night.png')
const overcast_rain_day = require('./assets/weathericons/128/overcast-day-rain.png')
const overcast_rain_night = require('./assets/weathericons/128/overcast-night-rain.png')
const rain = require('./assets/weathericons/128/rain.png')
const drizzle = require('./assets/weathericons/128/drizzle.png')
const fog = require('./assets/weathericons/128/fog.png')
const snow = require('./assets/weathericons/128/snow.png')
const thunder = require('./assets/weathericons/128/thunderstorms.png')
const thunder_rain = require('./assets/weathericons/128/thunderstorms-rain.png')
const hail = require('./assets/weathericons/128/hail.png')
const snowflake = require('./assets/weathericons/128/snowflake.png')
const cloudy = require('./assets/weathericons/128/cloudy.png')

function TodayWeather({ navigation }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [minTemp, setminTemp] = useState(null);
  const [maxTemp, setmaxTemp] = useState(null);
  const [precipitaProb, setprecipitaProb] = useState(null);
  const [windDir, setwindDir] = useState(null);
  const [weatherType, setweatherType] = useState(null);
  const [weatherTypeText, setweatherTypeText] = useState(null);
  const [weatherImage, setweatherImage] = useState(null);

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

    } else {
      // default location
      used_id = "1151200"
      used_name = "Setúbal"
      setName(used_name)
      setId(stored_id)
      fetch('http://api.ipma.pt/open-data/forecast/meteorology/cities/daily/' + stored_id + '.json?' + Math.random())
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
      console.log("it was null")
    }
  }

  function changeImage(int) {
    switch (int) {
      case 0:
        setweatherImage(no_info)
        break;
      case 1:
        setweatherImage(clear_day)
        break;
      case 2:
        setweatherImage(partly_cloudy_day)
        break;
      case 3:
        setweatherImage(overcast_day)
        break;
      case 4:
        setweatherImage(overcast_day)
        break;
      case 5:
        setweatherImage(overcast_day)
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
       alignItems:'center', 
       flexDirection: 'column'
       
    },

    text:{
    color: 'white'
    },

    text_weather_type:{
      color: 'white',
      paddingBottom: 20,
      fontSize: 17,
      fontWeight: 'bold'
      },

      text_localidade:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
        },
      


  })


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWeather();
    });


    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor:'#90bfd2', justifyContent: 'center' }}>
      <View style={styles.text_view}>
      <Text style={styles.text_localidade} >{name}</Text>
      </View>
      <View  style={{alignContent: 'center', alignItems:'center'}}>
      <Image
        source={weatherImage}
      />
      </View>
      <View style={styles.text_view}>
      <Text style={styles.text_weather_type}>{weatherTypeText}</Text>
      </View>
      <View style={{ alignContent: 'space-between', justifyContent: 'space-around', flexDirection: 'row'}}>
      <Text style={styles.mintemp_box}>{minTemp}℃</Text>
      <Text style={styles.maxtemp_box}>{maxTemp}℃</Text>
      </View>
      <View style={styles.text_view}>
      <Text style={[styles.text, { paddingBottom: 5, paddingTop: 10 }]}>Probablidade de Percipitação: {precipitaProb}%</Text>
      <Text style={[styles.text, { paddingTop: 5 }]}>Direção do vento: {windDir}</Text>
      </View>
      
    </View>
  );
}

function Settings({ navigation }) {
  async function getSettings() {
    let used_id;
    let used_name;
    const stored_id = await AsyncStorage.getItem('location_id')
    const stored_name = await AsyncStorage.getItem('location_name')
    if (stored_id !== null) {
      used_id = stored_id;
      used_name = stored_name;
      setValue(used_name)
      console.log("it aint null")
    } else {
      used_id = "1151200"
      used_name = "Setúbal"
      setValue(used_name)
      console.log("it was null")
    }
  }
  useEffect(() => {

    getSettings();
    const unsubscribe = navigation.addListener('focus', () => {

    });


    return unsubscribe;
  }, [navigation]);

  const data = [
    { label: 'Aveiro', value: '1010500' },
    { label: 'Beja', value: '1020500' },
    { label: 'Braga', value: '1030300' },
    { label: 'Guimarães', value: '1030800' },
    { label: 'Castelo Branco', value: '1050200' },
    { label: 'Coimbra', value: '1060300' },
    { label: 'Évora', value: '1070500' },
    { label: 'Faro', value: '1080500' },
    { label: 'Sagres', value: '1081505' },
    { label: 'Portimão', value: '1081100' },
    { label: 'Loulé', value: '1080800' },
    { label: 'Guarda', value: '1090700' },
    { label: 'Penhas Douradas', value: '1090821' },
    { label: 'Leiria', value: '1100900' },
    { label: 'Lisboa', value: '1110600' },
    { label: 'Portalegre', value: '1121400' },
    { label: 'Porto', value: '1131200' },
    { label: 'Santarém', value: '1141600' },
    { label: 'Setúbal', value: '1151200' },
    { label: 'Sines', value: '1151300' },
    { label: 'Viana do Castelo', value: '1160900' },
    { label: 'Vila Real', value: '1171400' },
    { label: 'Viseu', value: '1182300' },
    { label: 'Funchal', value: '2310300' },
    { label: 'Porto Santo', value: '2320100' },
    { label: 'Vila do Porto', value: '3410100' },
    { label: 'Ponta Delgada', value: '3420300' },
    { label: 'Angra do Heroísmo', value: '3430100' },
    { label: 'Santa Cruz da Graciosa', value: '3440100' },
    { label: 'Velas', value: '3450200' },
    { label: 'Madalena', value: '3460200' },
    { label: 'Horta', value: '3470100' },
    { label: 'Santa Cruz das Flores', value: '3480200' },
    { label: 'Vila do Corvo', value: '3490100' }
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 100,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 100,
    },
    icon: {
      marginRight: 1,
    },
    label: {
      position: 'absolute',
      color: 'black',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={500}
        maxWeight
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={async item => {
          setValue(item.label);
          setIsFocus(false);
          await AsyncStorage.setItem('location_id', item.value)
          await AsyncStorage.setItem('location_name', local_ids.get(item.value.toString()))
          const stored_id = await AsyncStorage.getItem('location_id')
          const stored_name = await AsyncStorage.getItem('location_name')
          console.log("id stored: " + stored_id + " | name stored: " + stored_name)
        }}
      />
      <Text style={{}}>{value}</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="O Tempo" component={TodayWeather} />
      <Drawer.Screen name="Definições" component={Settings} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
