import { Geocode } from "../../types";

const BASE_URL = import.meta.env.VITE_GEO_API_URL;

export async function fetchGeocode(
    city: string,
    setError: (error: string) => void 
): Promise<Geocode | null> {

    try {
        const response = await fetch(
            `${BASE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!response.ok) {
            setError(`Geocoding API error ${response.statusText}`);
            return null;
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return null;
        }

        const { latitude, longitude, name, country } = data.results[0];
        return { latitude, longitude, name, country };
    } catch (error) {
        setError("Failed to fetch geolocation data.");
        console.error(error);
        return null;
    }
}
