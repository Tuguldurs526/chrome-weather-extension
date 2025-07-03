import { useState, useEffect } from 'react';

export function useWeather(city: string, unit: 'metric'|'imperial') {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;
    
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      
      chrome.runtime.sendMessage(
        { type: 'GET_WEATHER', city, unit },
        (response) => {
          setLoading(false);
          
          if (response.error) {
            setError(response.error);
            return;
          }
          
          if (response.current.cod === 200) {
            setWeather(response.current);
            setForecast(response.forecast);
          } else {
            setError(response.current.message || 'City not found');
          }
        }
      );
    };
    
    fetchWeather();
  }, [city, unit]);

  return { weather, forecast, loading, error };
}
