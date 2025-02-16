export type City = {
    name: string;
    temperature: number;
    notes?: string;
    details?: CityDetails;
};

export interface CityProps {
  name: string;
  temperature: number;
  details?: CityDetails;
  onClick?: () => void;
}

export interface CityDetails {
  country: string;
  latitude: number;
  longitude: number;
  windspeed: number;
  windSpeedUnit: string;
  temperatureUnit: string;
  windDirection: number;
  weatherCode: number;
  time: string;
  timezone: string;
  elevation: number;
}

export interface CoordsResponse {
  lat: number; 
  lon: number; 
  name?: string; 
  country?: string;
}

export interface CoordsResponseExt {
  latitude: number; 
  longitude: number; 
  name?: string; 
  country?: string;
}
