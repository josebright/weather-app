import { useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../store/weatherStore";
import CityCard from "../../components/CityCard";
import Search from "../../components/SearchBar";
import { CityProps } from "../../types";
import "./styles.css";

export default function Home() {
  const { cities, favorites } = useWeatherStore();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="search">
        <Search />
      </div>

      {favorites.length > 0 && (
        <>
          <h2 className="section-title">Favorites</h2>
          <div className="city-list">
            {favorites.map((fav: string) => {
              const cityData = cities.find((c: { name: string }) => c.name === fav);
              return cityData ? <CityCard key={fav} {...cityData} onClick={() => navigate(`/city/${fav}`)} /> : null;
            })}
          </div>
        </>
      )}

      <h2 className="section-title">Top Cities by Population</h2>
      <div className="city-list">
        {cities.map((city: CityProps) => (
          <CityCard key={city.name} {...city} onClick={() => navigate(`/city/${city.name}`)} />
        ))}
        {cities.length === 0 && <p className="text">Empty!</p>}
      </div>
    </div>
  );
}
