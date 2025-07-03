interface WeatherCardProps {
  weather: any;
  unit: 'metric' | 'imperial';
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  const temp = weather.main.temp;
  const displayTemp = unit === 'metric'
    ? `${Math.round(temp)}°C`
    : `${Math.round(temp)}°F`;

  const windSpeed = unit === 'metric'
    ? `${weather.wind.speed} m/s`
    : `${weather.wind.speed} mph`;

  return (
    <div className="bg-blue-900 rounded-xl p-6 text-white shadow-lg mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-blue-200 capitalize">{weather.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`${weather.weather[0].description} icon`}
          className="w-20 h-20"
        />
      </div>
      <div className="mt-4">
        <p className="text-5xl font-light">{displayTemp}</p>
        <div className="flex space-x-4 mt-2">
          <span>💧 {weather.main.humidity}%</span>
          <span>💨 {windSpeed}</span>
        </div>
      </div>
    </div>
  );
}
