interface UnitToggleProps {
  unit: 'metric'|'imperial';
  onUnitChange: (unit: 'metric'|'imperial') => void;
}

export default function UnitToggle({ unit, onUnitChange }: UnitToggleProps) {
  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    onUnitChange(newUnit);
    chrome.storage.local.set({ unit: newUnit });
  };

  return (
    <button
      onClick={toggleUnit}
      className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm font-medium transition"
    >
      {unit === 'metric' ? '°C' : '°F'}
    </button>
  );
}
