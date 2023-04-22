import React,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { local_ids, weather_ids } from "./const";
/*
TODO: Get the settings done ASAP ROCKY, and then get that api and display stuff on the road
*/


function TodayWeather({ navigation }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [minTemp, setminTemp] = useState(null);
  const [maxTemp, setmaxTemp] = useState(null);
  const [probPer, setprobPerb] = useState(null);
  const [windDir, setwindDir] = useState(null);

 async function getWeather(){
  let used_id;
  let used_name;
  const stored_id = await AsyncStorage.getItem('location_id')
  const stored_name = await AsyncStorage.getItem('location_name')
    if (stored_id !== null) {
      used_id = stored_id;
      used_name = stored_name;
      setName(used_name)
      setId(stored_id)
      console.log("it aint null")

      fetch('http://api.ipma.pt/open-data/forecast/meteorology/cities/daily/'+ stored_id +'.json')
      .then((response) => response.json())
      .then((json) => console.log(json.data[0]))
      .catch((error) => console.error(error));

     } else {
       used_id = "1151200"
       used_name = "Setúbal"
       setName(used_name)
       setId(stored_id)
       console.log("it was null")
     }
  }
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    getWeather();
    });

   
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name = {name} | ID = {id}</Text>
      <Text>Weather here....</Text>
    </View>
  );
}

 function Settings({ navigation }) {
  async function getSettings(){
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
  useEffect( () => {

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
            console.log("id stored: " + stored_id + " | name stored: " +  stored_name)
          }}
        />
        <Text style={{bottom: 35, right: 65}}>{value}</Text>
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
