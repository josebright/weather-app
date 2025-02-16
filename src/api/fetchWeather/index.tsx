import { City, CityDetails, CoordsResponse, CoordsResponseExt } from "../../types";
import { fetchGeocode } from "../fetchGeocode";

const BASE_URL = import.meta.env.VITE_OPEN_METEO_API_URL;
const REVERSE_GEOCODE_URL = import.meta.env.VITE_REVERSE_GEOCODE_URL;

export async function fetchWeatherByCoords(
  geosInfo: CoordsResponse[], 
  setError: (error: string) => void 
): Promise<City[] | []> {
  try {
    const updatedGeosInfo = await Promise.all(
      geosInfo.map(async (geo) => {
        if (!geo.name || !geo.country) {
          try {
            const response = await fetch(`${REVERSE_GEOCODE_URL}&lat=${geo.lat}&lon=${geo.lon}`);
            if (response.ok) {
              const data = await response.json();
              return {
                ...geo,
                name: geo.name || data.address.city || data.address.county || data.address.state,
                country: geo.country || data.address.country,
              };
            }
          } catch (geoError) {
            setError(`Failed to fetch geocode: ${geoError}`);
          }
        }
        return geo;
      })
    );

    const params = updatedGeosInfo
      .map(({ lat, lon }) => `latitude=${lat}&longitude=${lon}&current_weather=true`)
      .join("&");

    const weatherResponse = await fetch(`${BASE_URL}?${params}`);

    if (!weatherResponse.ok) {
      setError("Weather data fetch failed.");
      return [];
    }

    const weatherData = await weatherResponse.json();
    if (!weatherData) {
      setError("Weather data unavailable.");
      return [];
    }

    return updatedGeosInfo.length > 0
      ? updatedGeosInfo.map((geoInfo, index) => {
          const isSingleGeo = updatedGeosInfo.length === 1;
          const currentWeather = isSingleGeo ? weatherData.current_weather : weatherData[index]?.current_weather;
          const currentWeatherUnits = isSingleGeo ? weatherData.current_weather_units : weatherData[index]?.current_weather_units;

          return {
            name: geoInfo.name || "",
            temperature: currentWeather.temperature,
            notes: "",
            details: {
              country: geoInfo.country,
              latitude: geoInfo.lat,
              longitude: geoInfo.lon,
              windspeed: currentWeather.windspeed,
              windSpeedUnit: currentWeatherUnits.windspeed,
              temperatureUnit: currentWeatherUnits.temperature,
              windDirection: currentWeather.winddirection,
              weatherCode: currentWeather.weathercode,
              time: currentWeather.time,
              timezone: isSingleGeo ? weatherData.timezone : weatherData[index]?.timezone,
              elevation: isSingleGeo ? weatherData.elevation : weatherData[index]?.elevation,
            } as CityDetails,
          };
        })
      : [];
  } catch (error) {
    setError("A network error occurred. Please check your connection.");
    console.error(error);
    return [];
  }
}

export async function fetchWeatherByCities(
  defaultCities: string[], 
  setError: (error: string) => void,
  localStorageCities: City[],
): Promise<City[] | null> {
  try {
    const geocodeData = await Promise.all(
      defaultCities.map((city) => {
        const localCity = localStorageCities.find((local) => local.name === city);
        if (localCity) {
          return {
            latitude: localCity.details?.latitude,
            longitude: localCity.details?.longitude,
            country: localCity.details?.country,
            name: localCity.name,
          } as CoordsResponseExt;
        } else {
          return fetchGeocode(city, setError);
        }
      })
    );

    const validGeocodes = geocodeData.filter((geo): geo is CoordsResponseExt => geo !== null);

    if (defaultCities.length === 1 && validGeocodes.length === 0) {
      setError("Invalid city input");
      return null;
    }

    return fetchWeatherByCoords(
      validGeocodes.map(({ latitude, longitude, country, name }) => ({
        lat: latitude,
        lon: longitude,
        country,
        name,
      })),
      setError
    );
  } catch (error) {
    setError("A network error occurred. Please check your connection.");
    console.error(error);
    return null;
  }
}
