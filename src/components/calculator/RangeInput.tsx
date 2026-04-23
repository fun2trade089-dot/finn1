interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  prefix?: string;
}

const RangeInput = ({ 
  label, value, min, max, step = 1, unit = "", onChange, prefix = "" 
}: RangeInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-gray-400 text-sm font-medium">{label}</label>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[120px]">
          <span className="text-gray-500 mr-1 text-sm">{prefix}</span>
          <input 
            type="number" 
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-transparent w-full text-right focus:outline-none font-bold text-success"
          />
          <span className="text-gray-500 ml-1 text-sm">{unit}</span>
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-success"
      />
    </div>
  );
};

export default RangeInput;
