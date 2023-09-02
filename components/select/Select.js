import { ChevronDown } from "lucide-react";
export default function Select({ label, options, value, onChange }) {
  return (
    <div className="mb-4 mr-4 relative">
      <select
        className="appearance-none cursor-pointer border rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}
