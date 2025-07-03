export function processForecastData(forecastData: any) {
  if (!forecastData?.list) return [];

  const daily: { [date: string]: any } = {};

  forecastData.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];

    if (!daily[date]) {
      daily[date] = {
        date,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        icon: item.weather[0].icon
      };
    } else {
      daily[date].minTemp = Math.min(daily[date].minTemp, item.main.temp_min);
      daily[date].maxTemp = Math.max(daily[date].maxTemp, item.main.temp_max);
    }
  });

  return Object.values(daily).slice(0, 5);
}
