import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Feather, Entypo, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import {debounce} from 'lodash';
import * as Location from 'expo-location';
import {LocationData, WeatherData} from '@/types';
import {
  fetchLocations,
  fetchWeatherByLatLong,
  fetchWeatherForecast,
} from '@/api/weather';

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [weather, setWeather] = useState<WeatherData>({});
  const [loading, setLoading] = useState(true);

  const handelLocation = (loc: {name: string}) => {
    console.log(locations);
    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
    }).then(data => {
      setWeather(data);
      setLoading(false);
      console.log(data);
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => setLocations(data));
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      Location.getCurrentPositionAsync({}).then(location => {
        fetchWeatherByLatLong(location.coords).then(data => {
          setWeather(data);
          setLoading(false);
        });
      });
    })();
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);
  const {current, location} = weather;
  console.log('Current: ', current?.condition?.text);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} className=" bg-slate-500">
      <View className="flex flex-1 bg-slate-500">
        <StatusBar style="light" />
        {loading ? (
          <View className="flex flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <View className="flex flex-1">
            {/* SEARCH BAR SECTION */}
            <View className=" mx-4 mt-5 relative z-10">
              <View
                className={`flex-row justify-end items-center rounded-full ${
                  Platform.OS == 'android' ? 'mt-4 ' : ''
                } ${showSearchBar ? 'bg-slate-300' : ''}`}>
                {showSearchBar ? (
                  <TextInput
                    onChangeText={handleDebounce}
                    placeholder="Search City"
                    placeholderTextColor={'white'}
                    className="h-12 pl-4 text-xl pb-1 flex-1"
                  />
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    setShowSearchBar(!showSearchBar);
                  }}
                  className="p-3 rounded-full m-1 bg-slate-400">
                  <FontAwesome5
                    name="search-location"
                    size={24}
                    color={'#FFFFFF'}
                  />
                </TouchableOpacity>
              </View>
              {locations.length > 0 && showSearchBar ? (
                <View
                  className={` absolute w-full z-10 top-16 rounded-3xl bg-slate-300 ${
                    Platform.OS == 'android' ? 'mt-4' : ''
                  }`}>
                  {locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length;
                    let borderClass = showBorder
                      ? 'border-b-2 border-b-gray-400'
                      : 'bg-black';
                    return (
                      <TouchableOpacity
                        onPress={() => handelLocation(loc)}
                        key={index}
                        className={
                          'flex-row items-center m-1 p-3 px-4' + borderClass
                        }>
                        <FontAwesome
                          name="map-marker"
                          size={20}
                          color={'black'}
                        />
                        <Text className="text-black font-bold text-lg ml-2">
                          {loc?.name}
                        </Text>
                        <Text className="text-black font-bold text-lg ml-2">
                          {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            {/* FORCAST SECTION */}

            {/* {!showSearchBar ? ( */}
            <View className="flex-1 flex justify-around mx-4 mb-2">
              <View className="flex-column items-center justify-center">
                <Text className="text-white text-3xl font-bold items-center justify-center">
                  {location?.name},
                </Text>
                <Text className="text-lg text-white font-semibold items-center justify-center">
                  {' ' + location?.country}
                </Text>
              </View>
              {/* IMAGE VIEW */}
              <View className="justify-center flex-column items-center">
                <Image
                  source={{
                    uri:
                      'https://' +
                      removeStartingDoubleSlash(current?.condition?.icon || ''),
                  }}
                  className="w-52 h-52"
                />
              </View>
              {/* TEMPERATURE CELCUS & WEATHER TEXT */}
              <View className="-mt-5 mb-2 bg-slate-400 p-2 rounded-xl">
                <Text className="text-center text-xl text-white tracking-widest">
                  {current?.condition?.text
                    ? '(' + current?.condition?.text + ')'
                    : ''}
                </Text>
              </View>
              <View className="space-y-6 m-4">
                <Text className="text-center text-6xl text-white font-bold">
                  {current?.temp_c}&#176;
                </Text>
              </View>
              {/* WEATHER CONDITIONS */}
              <View className="items-center">
                <View className="flex-row space-x-8 items-center ">
                  <View className="flex-row space-x-1 items-center">
                    <Feather name="wind" size={30} color="white" />
                    <Text className="items-center text-white text-lg font-semibold">
                      {current?.wind_kph} km
                    </Text>
                  </View>
                  <View className="flex-row space-x-1 items-center">
                    <Entypo name="drop" size={30} color="white" />
                    <Text className="items-center text-white text-lg font-semibold">
                      {current?.humidity}%
                    </Text>
                  </View>
                </View>
              </View>
              {/* NEXT DAYS FORCAST */}
              <View className="flex-row items-center ml-2 my-6">
                <FontAwesome name="calendar" size={30} color="white" />
                <Text className="text-white font-semibold ml-3 text-lg">
                  Daily Forcast
                </Text>
              </View>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {weather?.forecast?.forecastday?.map((days, index) => {
                    console.log('Image: ', days?.day?.condition?.text);
                    let date = new Date(days.date);
                    let options: Intl.DateTimeFormatOptions = {weekday: 'long'};
                    let dayName = date.toLocaleDateString('en-US', options);
                    if (index == 0) return null;
                    return (
                      <View
                        key={index}
                        className=" w-32 rounded-3xl py-4 px-5 ml-3 bg-slate-400">
                        <Text className="text-slate-300 font-semibold text-center py-1">
                          {dayName}
                        </Text>
                        <Image
                          source={{
                            uri:
                              'https://' +
                              removeStartingDoubleSlash(
                                days?.day?.condition?.icon || '',
                              ),
                          }}
                          className="w-20 h-20 self-center"
                        />
                        <Text className="text-slate-300 font-semibold text-center py-1">
                          {days?.day?.condition?.text
                            ? '(' + days?.day?.condition?.text + ')'
                            : ''}
                        </Text>
                        <Text className="text-white font-semibold text-lg text-center">
                          {days?.day?.avgtemp_c}&#176;
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function removeStartingDoubleSlash(text: string) {
  // Check if the string starts with "//" using startsWith()
  text = text.replace('64x64', '128x128');
  if (text.startsWith('//')) {
    // If it does, slice the string starting from the second character (index 2)
    return text.slice(2);
  } else {
    // If it doesn't start with "//", return the original string
    return text;
  }
}
