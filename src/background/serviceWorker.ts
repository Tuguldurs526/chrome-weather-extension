chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === "GET_WEATHER") {
    chrome.storage.local.get(['apiKey', 'unit'], async (result) => {
      const { city } = request;
      const unit = result.unit || 'metric';
      const apiKey = result.apiKey || '';

      if (!apiKey) {
        sendResponse({ error: "API key not configured" });
        return;
      }

      try {
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${apiKey}`
        );
        const currentData = await currentRes.json();

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${apiKey}`
        );
        const forecastData = await forecastRes.json();

        sendResponse({ current: currentData, forecast: forecastData });
      } catch (error) {
        sendResponse({ error: "API request failed" });
      }
    });
    return true;
  }
});
