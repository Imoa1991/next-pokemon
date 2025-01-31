import { DataTable } from "@/components/DataTable";
import SearchBar from "@/components/SearchBar";
import { usePokemon } from "@/hooks/usePokemon";
import { useMemo } from "react";

export default function PokemonList() {
  const { state, columns, handleSearchChange } = usePokemon();

  // We can add a useMemo hook to memoize the filteredPokemon
  const filteredPokemon = useMemo(() => {
    return state.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.pokemonList, state.searchQuery]);

  if (state.error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500 font-bold">{state.error}</p>
      </div>
    );
  }

  if (!state.pokemonList.length) {
    return null;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text mb-4 uppercase">
        Lista de Pokémon
      </h1>
      <SearchBar
        searchQuery={state.searchQuery}
        onSearchChange={handleSearchChange}
        className="mb-6 w-full max-w-xl"
      />
      <DataTable columns={columns} data={filteredPokemon} />
    </div>
  );
}
