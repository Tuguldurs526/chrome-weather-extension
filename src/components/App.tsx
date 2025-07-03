import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import UnitToggle from "./UnitToggle";
import { processForecastData } from "../utils/processForecast";
import { getCurrentWeather, getForecast } from "../api/weather";

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<'metric'|'imperial'>("metric");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load API key, unit, and last city on mount
  useEffect(() => {
    chrome.storage.local.get(["apiKey", "unit", "lastCity"], (result) => {
      setApiKey(result.apiKey || null);
      if (result.unit) setUnit(result.unit);
      if (result.lastCity) setCity(result.lastCity);
    });
  }, []);

  // Save city and unit when changed
  useEffect(() => {
    if (city) chrome.storage.local.set({ lastCity: city });
  }, [city]);
  useEffect(() => {
    chrome.storage.local.set({ unit });
  }, [unit]);

  // Refetch weather when unit or city changes, or when API key loads
  useEffect(() => {
    if (city && apiKey) {
      searchWeather();
    }
    // eslint-disable-next-line
  }, [unit, apiKey]);

  const searchWeather = async () => {
    if (!city.trim() || !apiKey) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      // Use your improved weather.ts functions!
      const currentData = await getCurrentWeather(city, unit);
      const forecastData = await getForecast(city, unit);

      setWeather(currentData);
      setForecast(processForecastData(forecastData));
    } catch (e: any) {
      setError(e.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="p-4">
        <p className="mb-2 text-red-500 font-bold">
          Please enter your OpenWeather API key in Options.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          Open Options
        </button>
        <p className="mt-2 text-sm">
          Don’t have a key? <a href="https://home.openweathermap.org/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Get one here</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-[400px] p-4 bg-gradient-to-b from-blue-900 to-blue-400 min-h-[500px]">
      <div className="flex items-center mb-4">
        <input
          disabled={loading}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="flex-1 p-2 rounded-l border"
          onKeyDown={(e) => e.key === 'Enter' && searchWeather()}
        />
        <button
          disabled={loading}
          onClick={searchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50"
        >
          Search
        </button>
        <UnitToggle unit={unit} onUnitChange={setUnit} />
      </div>

      {loading && <div className="text-white text-center">Loading...</div>}
      {error && <div className="text-red-300 text-center">{error}</div>}

      {weather && (
        <>
          <WeatherCard weather={weather} unit={unit} />
          <Forecast forecast={forecast} unit={unit} />
        </>
      )}
    </div>
  );
}
