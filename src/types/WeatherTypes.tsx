/* eslint-disable @typescript-eslint/no-explicit-any */
import { City } from "./CityTypes";

export interface WeatherState {
    [x: string]: any;
    cities: City[];
    favorites: string[];
    error: string | null;
    successMessage: string | null;
    isLoading: boolean;
    setError: (error: string | null) => void;
    setSuccessMessage: (message: string | null) => void;
    setLoading: (loading: boolean) => void;
    addCity: (city: string, navigate: (path: string) => void) => Promise<void>;
    removeCity: (city: string) => void;
    toggleFavorite: (city: string) => void;
    updateNote: (city: string, newNote: string) => void;
    editNote: (city: string, noteIndex: number, updatedNote: string) => void;
    removeNote: (city: string, noteIndex: number) => void;
    fetchInitialCities: () => Promise<void>;
    fetchUpdatedCities: (includeNewCity?: boolean, city?: string, navigate?: (path: string) => void) => Promise<void>;
    getUserLocation: (lat: number, lon: number) => Promise<string | null>;
}
