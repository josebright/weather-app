import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWeatherStore } from "../../store/weatherStore";
import CityInfoItem from "../../components/CityInfoItem";
import backIcon from "../../assets/icons/icons8-back.png";
import "./styles.css";

export default function CityDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { cities, updateNote, editNote, removeNote } = useWeatherStore();
  const city = cities.find((c) => c.name === name);

  const [newNote, setNewNote] = useState("");

  if (!city) return 
    <div className="container">
      <p className="error-message">City not found</p>
    </div>;

  return (
    <div className="container">
      <button className="home-button" onClick={() => navigate("/")}>
        <img src={backIcon} alt="Back Icon" className="back-icon" />
        Go To Home
      </button>

      <h2 className="city-title">
        {city.name}, {city.details?.country}
      </h2>
      <p className="city-temp">
        Temperature: {city.temperature}°{city.details?.temperatureUnit || "C"}
      </p>

      <div className="city-info">
        <CityInfoItem label="Latitude" value={city.details?.latitude} />
        <CityInfoItem label="Longitude" value={city.details?.longitude} />
        <CityInfoItem label="Windspeed" value={`${city.details?.windspeed} ${city.details?.windSpeedUnit}`} />
        <CityInfoItem label="Wind Direction" value={`${city.details?.windDirection}°`} />
        <CityInfoItem label="Weather Code" value={city.details?.weatherCode} />
        <CityInfoItem label="Timezone" value={city.details?.timezone} />
        <CityInfoItem label="Elevation" value={`${city.details?.elevation}m`} />
        <CityInfoItem label="Time" value={city.details?.time} />
      </div>

      <h3 className="notes-title">Notes</h3>
      <ul className="notes-list">
        {Array.isArray(city.notes) && city.notes.length > 0 ? (
          city.notes?.map((note, index) => (
            <li key={index} className="note-item">
              <textarea
                className="note-textarea"
                value={note}
                placeholder="Write a note..."
                onChange={(e) => editNote(city.name, index, e.target.value)}
              />
              <button className="delete-button" onClick={() => removeNote(city.name, index)}>Delete</button>
            </li>
          ))
        ) : (
          <p className="no-notes">No notes yet. Add one below!</p>
        )}
      </ul>

      <div className="note-input-div">
        <textarea
          className="note-input"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
        />
      </div>

      <button
        className="save-button"
        onClick={() => {
          if (newNote.trim() !== "") {
            updateNote(city.name, newNote);
            setNewNote("");
          }
        }}
      >
        Add Note
      </button>
    </div>
  );
}
