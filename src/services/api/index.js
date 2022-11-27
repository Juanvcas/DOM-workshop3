const GEO_API = process.env.NEXT_PUBLIC_API_GEO_URL;
const GEO_VER = process.env.NEXT_PUBLIC_API_GEO_VER;
const GEO_KEY = process.env.NEXT_PUBLIC_API_GEO_KEY;
const WEA_API = process.env.NEXT_PUBLIC_API_WEATHER_URL;
const WEA_VER = process.env.NEXT_PUBLIC_API_WEATHER_VER;
const WEA_KEY = process.env.NEXT_PUBLIC_API_WEATHER_KEY;

const endPoints = {
   geolocation: {
      getGeolocation: (city, limit = '1') =>
         `${GEO_API}/${GEO_VER}/direct?q=${city}&limit=${limit}&appid=${GEO_KEY}`,
   },
   weather: {
      directWeather: (lat, lon) =>
         `${WEA_API}/${WEA_VER}/weather?lat=${lat}&lon=${lon}&appid=${WEA_KEY}`,
   },
};

export default endPoints;
