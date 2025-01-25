"use client";
import { useReducer, useEffect } from "react";
import {
  Pokemon,
  PokemonAction,
  PokemonDetailType,
  PokemonState,
} from "@/types";
import { getPokemonList, getPokemonDetail } from "@/services/fetchPokemon";
// import { useTable } from "./useTable";

const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetails: {},
  searchQuery: "",
};

function pokemonReducer(
  state: PokemonState,
  action: PokemonAction
): PokemonState {
  switch (action.type) {
    case "SET_POKEMON_LIST":
      return { ...state, pokemonList: action.payload };
    case "SET_POKEMON_DETAILS":
      return {
        ...state,
        pokemonDetails: {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload.data,
        },
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export function usePokemon() {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  // const { onSort, sort, onCurrentPage, currentPage, onPageSize, pageSize } =
  //   useTable();

  useEffect(() => {
    getPokemonList().then((pokemons) => {
      dispatch({
        type: "SET_POKEMON_LIST",
        payload: pokemons.sort((a: Pokemon, b: Pokemon) =>
          a.name.localeCompare(b.name)
        ),
      });
    });
  }, []);

  const getDetails = (name: string) => {
    getPokemonDetail(name).then((data) => {
      dispatch({ type: "SET_POKEMON_DETAILS", payload: { name, data } });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const updatePokemonDetails = (pokemon: PokemonDetailType) => {
    dispatch({
      type: "SET_POKEMON_DETAILS",
      payload: { name: pokemon.name, data: pokemon },
    });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "url",
      header: "Url",
    },
  ];

  return {
    state,
    columns,
    getDetails,
    handleSearchChange,
    updatePokemonDetails,
  };
}
