import endPoints from '@services/api';

const fetchGeo = async (endpoint) => {
   const res = await fetch(endPoints.geolocation.getGeolocation(endpoint));
   const data = await res.json();
   return data;
};

const fetchWeather = async (lat, lon) => {
   const res = await fetch(endPoints.weather.directWeather(lat, lon));
   const data = await res.json();
   return data;
};

export { fetchGeo, fetchWeather };
