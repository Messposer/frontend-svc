interface FilterInputProps {
  filterValue: string;
  placeholder: string;
  className?: string;
  setFilterValue: (value: string) => void;
}
const FilterInput = ({ filterValue, setFilterValue, placeholder, className }: FilterInputProps) => {

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={filterValue}
      onChange={handleFilterChange}
      placeholder={placeholder}
      className={`filter-input ${className}`}
    />
  );
};

export default FilterInput;
