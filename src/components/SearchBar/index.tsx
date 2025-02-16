import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../store/weatherStore";
import { fetchCities } from "../../api/searchCities";
import "./styles.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { addCity } = useWeatherStore();
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const city = query;
    if (city) {
      await addCity(city, navigate);
      setQuery("");
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (query.length > 1) {
      const delayDebounce = setTimeout(async () => {
        const cities = await fetchCities(query);
        setSuggestions(cities);
      }, 200);
  
      return () => clearTimeout(delayDebounce);
    } else {
      setSuggestions([]);
    }
  }, [query]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="autocomplete">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search city..."
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions" ref={suggestionsRef}>
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleSelect(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}
