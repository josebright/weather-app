import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchWeatherByCities, fetchWeatherByCoords } from "../../api/fetchWeather";
import { WeatherState, City } from "../../types";
import { TOP15CITIESBYPOPULATION } from "../../utils/constants";

let CITIES = TOP15CITIESBYPOPULATION;

export const useWeatherStore = create<WeatherState>() (
  persist(
    (set, get) => ({
      cities: [],
      favorites: [],
      error: null,
      isLoading: false,
      successMessage: null,

      setError: (error: string | null) => set({ error }),

      setSuccessMessage: (message: string | null) => set({ successMessage: message }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      addCity: async function (city: string, navigate: (path: string) => void) {
        if (CITIES.includes(city)) {
          await get().setError(`${city} already exists!`);
          return;
        }

        set({ isLoading: true });
        CITIES = [...CITIES, city].sort((a, b) => a.localeCompare(b));
        await get().fetchUpdatedCities(true, city, navigate);
      },

      removeCity: function (city: string) {
        set({ isLoading: true });
        CITIES = CITIES.filter((c) => c !== city);
        set((state) => ({
          cities: state.cities.filter((c) => c.name !== city),
          favorites: state.favorites.filter((fav) => fav !== city),
        }));
        set({ isLoading: false, successMessage: `${city} deleted successfully!` });
      },

      toggleFavorite: function (city: string) {
        set({ isLoading: true });
        set((state) => {
          const isFavorite = state.favorites.includes(city);
          const updatedFavorites = isFavorite
            ? state.favorites.filter((fav) => fav !== city)
            : [...state.favorites, city].sort();

          return {
            favorites: updatedFavorites,
            successMessage: isFavorite
              ? `${city} removed from favorites.`
              : `${city} added to favorites.`,
          };
        });
        set({ isLoading: false });
      },

      updateNote: function (city: string, newNote: string) {
        set({ isLoading: true });
        set((state) => ({
          cities: state.cities.map((c) =>
            c.name === city ? { ...c, notes: [...(c.notes || []), newNote] } : c
          ),
          isLoading: false,
          successMessage: `Note added for ${city}.`,
        }));
      },

      editNote: function (city: string, noteIndex: number, updatedNote: string) {
        set((state) => ({
          cities: state.cities.map((c) =>
            c.name === city
              ? {
                  ...c,
                  notes: Array.isArray(c.notes)
                    ? c.notes.map((note, idx) =>
                        idx === noteIndex ? updatedNote : note
                      )
                    : [],
                }
              : c
          ),
          successMessage: `Note updated for ${city}.`,
        }));
      },      

      removeNote: function (city: string, noteIndex: number) {
        set((state) => ({
          cities: state.cities.map((c) =>
            c.name === city
              ? {
                  ...c,
                  notes: Array.isArray(c.notes)
                    ? c.notes.filter((_, idx) => idx !== noteIndex)
                    : [],
                }
              : c
          ),
          successMessage: `Note deleted for ${city}.`,
        }));
      },

      fetchInitialCities: async function () {
        set({ isLoading: true, favorites: [], error: null });
        const cityData = await fetchWeatherByCities([...CITIES], get().setError, get().cities);
        if (!cityData) return set({ isLoading: false });

        const validCities = cityData.length
          ? cityData.map((city) => ({
              ...city,
              notes: city.notes ?? "",
            }))
          : (get().cities as City[]);

        set({
          isLoading: false,
          cities: validCities.sort((a, b) => a.name.localeCompare(b.name)),
        });
      },

      fetchUpdatedCities: async function (includeNewCity: boolean = false, city: string = "", navigate) {
        const updatedCityData = await fetchWeatherByCities([...CITIES], get().setError, get().cities);
        if (!updatedCityData) return set({ isLoading: false });

        if (includeNewCity && city && navigate) {
          navigate(`/city/${encodeURIComponent(city)}`);
        }

        set((state) => ({
          cities: includeNewCity
            ? [...state.cities, ...updatedCityData]
                .reduce((acc: City[], city) => {
                  const existingCity = acc.find((c) => c.name === city.name);
                  if (existingCity) {
                    existingCity.temperature = city.temperature;
                    return acc;
                  }
                  return [...acc, city];
                }, [])
                .sort((a, b) => a.name.localeCompare(b.name))
            : state.cities
                .map((existingCity) => {
                  const updatedCity = updatedCityData.find(
                    (c) => c.name === existingCity.name
                  );
                  return updatedCity
                    ? { ...existingCity, temperature: updatedCity.temperature }
                    : existingCity;
                })
                .sort((a, b) => a.name.localeCompare(b.name)),
          isLoading: false,
          successMessage: includeNewCity ? `${city} added successfully!` : "",
        }));
      },

      getUserLocation: async function (lat: number, lon: number): Promise<string | null> {
        try {
          const userCityData = await fetchWeatherByCoords([{ lat, lon }], get().setError);

          if (!userCityData || userCityData.length === 0 || !userCityData[0].name) {
            set({ error: "Could not determine city from coordinates." });
            return null;
          }

          const cityName = userCityData[0].name;

          set((state) => {
            const cityExists = state.cities.some((city) => city.name === cityName);

            if (!cityExists) {
              return {
                cities: [...state.cities, ...userCityData].sort((a, b) =>
                  a.name.localeCompare(b.name)
                ),
              };
            }

            return state;
          });

          return cityName;
        } catch (error) {
          set({ error: `Failed to fetch weather for user location: ${error}` });
          return null;
        }
      },
    }),
    {
      name: "weather-storage",
    }
  )
)
