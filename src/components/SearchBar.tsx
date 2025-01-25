import { Input } from "./Input";
import { SearchBarProps } from "@/types";

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  className,
}) => {
  return (
    <Input
      type="text"
      value={searchQuery}
      onChange={onSearchChange}
      placeholder="Buscar Pokémon..."
      className={className}
    />
  );
};

export default SearchBar;
