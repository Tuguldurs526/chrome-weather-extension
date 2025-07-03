interface ForecastItem {
  date: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
}

interface ForecastProps {
  forecast: ForecastItem[];
  unit: 'metric' | 'imperial';
}

export default function Forecast({ forecast, unit }: ForecastProps) {
  const formatTemp = (temp: number) => `${Math.round(temp)}°${unit === 'metric' ? 'C' : 'F'}`;

  return (
    <div className="bg-blue-800 text-white rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold mb-3">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-medium">{item.date}</span>
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt="Forecast"
                className="w-8 h-8"
              />
              <span className="ml-2">
                {formatTemp(item.maxTemp)}/{formatTemp(item.minTemp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
