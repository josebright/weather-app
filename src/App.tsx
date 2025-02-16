/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";
import { useWeatherStore } from "./store/weatherStore";
import ErrorModal from "./components/ErrorModal";
import Preloader from "./components/Preloader";
import Toast from "./components/Toast";
import { checkLocationPermission } from "./helper";

export default function App() {
  const {
    error,
    setError,
    isLoading,
    successMessage,
    setSuccessMessage,
    fetchInitialCities,
    fetchUpdatedCities,
    getUserLocation,
  } = useWeatherStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkLocationPermission()?.then((status) => {
      if (status !== "granted" && status !== "denied") {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
  
              try {
                const cityName = await getUserLocation(latitude, longitude);
                if (cityName) {
                  navigate(`/city/${encodeURIComponent(cityName)}`);
                }
              } catch (err) {
                setError("Could not retrieve city name from location.");
                console.error(err);
              }
            },
            (error) => {
              setError(`Error info: ${error.message}`);
            }
          );
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      }
    });

    const interval = setInterval(() => {
      fetchUpdatedCities();
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location?.pathname === "/") {
      fetchInitialCities();
    }
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />
      <ErrorModal error={error} onClose={() => setError(null)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:name" element={<CityDetails />} />
      </Routes>
    </>
  );
}
