import {View, Text, Image} from 'react-native';
import React from 'react';
import removeStartingDoubleSlash from '@/helpers/removeStartingDoubleSlash';
import {Feather, Entypo} from '@expo/vector-icons';
import {CurrentWeatherData} from '@/types/CurrentWeatherData';

type CurrentWeatherProp = {
  current?: CurrentWeatherData;
};
const CurrentWeather: React.FC<CurrentWeatherProp> = ({current}) => {
  return (
    <>
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
          {current?.condition?.text ? '(' + current?.condition?.text + ')' : ''}
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
    </>
  );
};

export default CurrentWeather;
