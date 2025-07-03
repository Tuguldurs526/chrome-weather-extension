const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

export async function getCurrentWeather(
  city: string,
  unit: 'metric' | 'imperial'
): Promise<CurrentWeather> {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=${unit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (res.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      if (res.status === 401) {
        throw new Error("Invalid API key");
      }
      throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Check your internet connection");
    }
    throw error;
  }
}

export async function getForecast(
  city: string,
  unit: 'metric' | 'imperial'
): Promise<ForecastResponse> {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=${unit}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (res.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      if (res.status === 401) {
        throw new Error("Invalid API key");
      }
      throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Check your internet connection");
    }
    throw error;
  }
}
