export type WeatherCondition = {
  text: string;
  icon: string;
};

export type CurrentWeather = {
  condition?: WeatherCondition;
  temp_c: number;
  wind_kph: number;
  humidity: number;
};

export type Location = {
  name: string;
  country: string;
};

export type ForecastDay = {
  date: string;
  date_epoch: number;
  day?: {
    condition?: WeatherCondition;
    avgtemp_c: number;
  };
};

export type Forecast = {
  forecastday?: ForecastDay[];
};

export type WeatherData = {
  current?: CurrentWeather;
  forecast?: Forecast;
  location?: Location;
};
