export type WeatherData = {
  current?: {
    condition?: {
      text: string;
      icon: string;
    };
    temp_c: number;
    wind_kph: number;
    humidity: number;
  };
  forecast?: {
    forecastday?: {
      date: string;
      day?: {
        condition?: {
          text: string;
          icon: string;
        };
        avgtemp_c: number;
      };
    }[];
  };
  location?: {
    name: string;
    country: string;
  };
};
