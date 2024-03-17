import axios, {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

interface Params {
  cityName?: string;
  days?: number;
  latitude?: number;
  longitude?: number;
}

const apiKey = Config.WEATHER_API_KEY;

const forecastEndpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=7&aqi=yes&alerts=yes`;

const locationsEndpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const forecastLatLongpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.latitude},${params.longitude}&days=7&aqi=yes&alerts=yes`;

const apiCall = async <T>(endpoint: string): Promise<T> => {
  console.log(endpoint);
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request<T>(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {} as T;
  }
};

export const fetchWeatherForecast = (params: Params) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall<any>(forecastUrl); // Since the response structure isn't defined, using 'any' here
};

export const fetchWeatherByLatLong = (params: Params) => {
  let forecastUrl = forecastLatLongpoint(params);
  return apiCall<any>(forecastUrl);
};

export const fetchLocations = (params: Params) => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall<any>(locationsUrl); // Using 'any' due to undefined response structure
};
