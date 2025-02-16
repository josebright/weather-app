import { useWeatherStore } from "../../store/weatherStore";
import { CityProps } from "../../types";
import removeIcon from "../../assets/icons/icons8-cancel.png";
import favoriteIcon from "../../assets/icons/icons8-favourite.png";
import unFavoriteIcon from "../../assets/icons/icons8-star.png";
import "./styles.css";

export default function CityCard({ name, temperature, details, onClick }: CityProps) {
  const { removeCity, toggleFavorite, favorites } = useWeatherStore();

  return (
    <div className="city-card" onClick={onClick}>
      <h3>{name}</h3>
      <p>{temperature}{details?.temperatureUnit || "°C"}</p>
      
      <button
        className="city-card-button button-magin-right"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(name);
        }}
      >
        {favorites.includes(name) ? (
          <>
            <img src={unFavoriteIcon} alt="Unfavorite Icon" className="group-icon" />
            Unfavorite
          </>
        ) : (
          <>
            <img src={favoriteIcon} alt="Favorite Icon" className="group-icon" />
            Favorite
          </>
        )}
      </button>

      <button
        className="city-card-button button-magin-left"
        onClick={(e) => {
          e.stopPropagation();
          removeCity(name);
        }}
      >
        <img src={removeIcon} alt="Remove Icon" className="group-icon" />
        Remove
      </button>
    </div>
  );
}
