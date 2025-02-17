const BASE_URL = import.meta.env.VITE_CITIES_API_URL;
const USER_NAME = import.meta.env.VITE_MY_USERNAME;

export async function fetchCities(query: string): Promise<string[]> {
    if (!query) return [];

    try {
        const response = await fetch(
            `${BASE_URL}/searchJSON?q=${encodeURIComponent(query)}&name_startsWith=${encodeURIComponent(query)}&maxRows=10&orderby=population&style=LONG&lang=en&username=${USER_NAME}`
        );

        const data = await response.json();

        return data.geonames?.map((city: { name: string }) => city.name) || [];
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return [];
    }
};
