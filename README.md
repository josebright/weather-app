# Weather App

## Overview

This Weather App is a **React + TypeScript** application that provides real-time weather updates for cities worldwide. Users can search for cities, add them to their favorites, write notes, and automatically update weather data every 30 seconds. The app persists data using Zustand and local storage.

### Why Open-Meteo Over Weatherstack?

Initially, **Weatherstack** was considered for fetching weather data. However, it only allows **100 API calls per month**, making it **unsuitable for real-time updates**. Instead, **Open-Meteo** was chosen due to:

- **10,000 API calls per day** (ideal for frequent updates)
- **Free and open-source**
- **Supports bulk requests** for multiple cities in one call
- **Real-time and forecasted weather data**

## Features

### ✅ Real-time Weather Updates

- Fetches weather data **every 30 seconds** to ensure up-to-date information.
- Uses **batch API calls** to minimize requests and optimize performance.

### ✅ Search & Add Cities

- Users can **search for a city** and add it to the list.
- Prevents duplicate city entries.
- New cities persist in local storage and update in real-time.

### ✅ Favorites List

- Users can **mark cities as favorites** for quick access.
- Favorites persist across sessions using **Zustand and local storage**.

### ✅ Notes for Cities

- Users can **add personal notes** to each city.
- Notes are stored and persist between sessions.

### ✅ Optimized API Calls

- Uses **Open-Meteo’s Geocoding API** to fetch city coordinates.
- Weather data is updated **only if needed**, reducing redundant API calls.

## Technical Stack

- **Frontend:** React, TypeScript
- **State Management:** Zustand (with persistence via local storage)
- **API:** Open-Meteo (Geocoding & Weather API)
- **Styling:** CSS (custom, no UI framework)
- **Testing:** Unit tests for key components

## Installation & Setup

1. **Unzip the project**
   
   **Windows (Command Prompt or PowerShell)**
   ```sh
   tar -xf filename.zip
   ```
   or
   ```sh
   powershell -Command "Expand-Archive -Path filename.zip -DestinationPath ."
   ```

   **Mac (Terminal)**
   ```sh
   unzip filename.zip
   ```
   or
   ```sh
   tar -xf filename.zip
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory
   - Add the following:
     ```sh
     REACT_APP_OPEN_METEO_API_URL=https://api.open-meteo.com/v1/forecast
     REACT_APP_GEO_API_URL=https://geocoding-api.open-meteo.com/v1/search
     ```

4. **Run the application:**

   ```sh
   npm start
   ```

### Deployment
- **Netlify** 
- **URL:** ([weather-app](https://my-company-1c8vhskv3-josebrights-projects.vercel.app))
