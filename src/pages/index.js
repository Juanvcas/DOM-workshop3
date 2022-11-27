import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchGeo, fetchWeather } from '@hooks/useFetch';

export default function Home() {
   const [clean, setClean] = useState(false);

   const cleanWeathers = () => {
      const weatherCont = document.querySelector('#weathers-cont');
      const weathersClean = document.querySelector('#weathers-clean');
      weatherCont.innerHTML = '';
      setClean(false);
   };

   const addWeather = async (event) => {
      event.preventDefault();
      const weatherSearch = document.querySelector('#weather-search');

      if (weatherSearch.value) {
         const geolocation = await fetchGeo(weatherSearch.value);
         const weather = await fetchWeather(
            geolocation[0].lat,
            geolocation[0].lon
         );

         const element = document.createElement('article');
         element.classList =
            'relative flex flex-col items-center w-auto h-auto p-8 border rounded-xl';
         element.innerHTML = `
            <h2 class="text-3xl font-bold">${
               weather.name
            } - <span class="font-light">${weather.sys.country}</span></h2>
            <h3 class="text-2xl mt-6">${weather.weather[0].main}</h3>
            <p class="text-7xl font-black p-8">${(
               weather.main.temp - 273.15
            ).toFixed(1)}<span class="text-3xl font-bold">°C</span></p>
            <p class="text-2xl mt-2">${weather.weather[0].description}</p>
            `;

         const weatherCont = document.querySelector('#weathers-cont');
         weatherCont.appendChild(element);

         setClean(true);
      } else {
         console.log('Please type a correct value');
      }
   };
   useEffect(() => {}, []);
   return (
      <>
         <Head>
            <title>Weather Consult App</title>
         </Head>
         <main className="w-full h-auto">
            <section className="w-full h-auto py-24 bg-sky-900 text-white">
               <div className="flex flex-col items-center w-4/5 max-w-7xl h-auto mx-auto">
                  <h1 className="text-5xl font-bold">Weather Consult App</h1>
                  <h2 className="mt-8 text-3xl font-semibold">
                     ¡Consult the wather of any country in real time and just
                     with one consult!
                  </h2>
               </div>
            </section>
            <section className="w-full h-auto py-8">
               <div className="flex flex-col items-center w-4/5 max-w-7xl h-auto mx-auto">
                  <h3 className="text-2xl font-medium">
                     Type a city and see its weather...
                  </h3>
                  <form
                     name="weather search"
                     className=" flex flex-nowrap justify-center w-full h-auto mt-8"
                  >
                     <input
                        type={'text'}
                        name="weather search"
                        placeholder="London..."
                        className="w-9/12 h-16 p-4 text-xl bg-gray-100 rounded-xl mr-8"
                        id="weather-search"
                     ></input>
                     <button
                        type={'submit'}
                        name="weather search"
                        className="flex justify-center items-center w-1/5 h-16 text-2xl text-white bg-sky-700 rounded-xl"
                        id="weather-submit"
                        onClick={(event) => addWeather(event)}
                     >
                        Consult
                     </button>
                  </form>
                  {clean && (
                     <button
                        name="weather search"
                        className="flex justify-center items-center mt-8 w-1/5 h-16 text-2xl text-white bg-gray-700 rounded-xl"
                        id="weathers-clean"
                        onClick={cleanWeathers}
                     >
                        Clean
                     </button>
                  )}
                  <div
                     className="grid grid-cols-3 grid-rows-auto gap-4 w-full h-auto mt-16"
                     id="weathers-cont"
                  ></div>
               </div>
            </section>
         </main>
      </>
   );
}
