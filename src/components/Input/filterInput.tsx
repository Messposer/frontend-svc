interface FilterInputProps {
  filterValue: string;
  placeholder: string;
  setFilterValue: (value: string) => void;
}
const FilterInput = ({ filterValue, setFilterValue, placeholder }: FilterInputProps) => {

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={filterValue}
      onChange={handleFilterChange}
      placeholder={placeholder}
      className="filter-input"
    />
  );
};

export default FilterInput;
