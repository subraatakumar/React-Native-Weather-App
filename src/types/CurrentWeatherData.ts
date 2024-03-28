export type CurrentWeatherData = {
  condition?: {
    text: string;
    icon: string;
  };
  temp_c: number;
  wind_kph: number;
  humidity: number;
};
