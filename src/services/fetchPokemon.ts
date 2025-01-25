import { Pokemon, PokemonDetailType } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

/* export const getPokemonList = async () => {
   const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100").then(response => response.json());
   return data.results;
 }; */

/*
Since the API doesn't have any ability to sort the results by name, it doesn't allow us to make a paginator, which would be the most efficient option.
In order to display all the pokemons sorted, we need to have them all.
Right now the API returns about 1300 pokemons, I've set a limit of 2000, I know it's not the best option but it was the fastest to implement.

It could be improved by making a first call with a limit of N pokemons, reading the count to know the total and then making a promise.all to bring the rest of the pokemons, thus ensuring that if the catalog increases in the future, we will have them all.
 */
export const getPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await api.get("/pokemon?limit=2000");
    const pokemons: Pokemon[] = response.data.results.map(
      (pokemon: Pokemon) => {
        return {
          name: pokemon.name,
          url: pokemon.url,
        };
      }
    );
    return pokemons;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    throw error;
  }
};

export const getPokemonDetail = async (
  name: string
): Promise<PokemonDetailType> => {
  try {
    const response = await api.get(`/pokemon/${name}`);
    let pokemon = response.data;
    if (pokemon.forms && pokemon.forms.length > 0) {
      const formsResponse = await Promise.all(
        pokemon.forms.map((form: { url: string }) => api.get(form.url))
      );
      pokemon.forms = formsResponse.map((response) => {
        const form = response.data;
        return {
          id: form.id,
          is_battle_only: form.is_battle_only,
        };
      });
    }

    if (pokemon.moves && pokemon.moves.length > 0) {
      pokemon.moves = pokemon.moves.map(
        (move: { move: { name: string; url: string } }) => {
          return {
            move: {
              name: move.move.name,
              url: move.move.url,
            },
          };
        }
      );
    }

    if (pokemon.abilities && pokemon.abilities.length > 0) {
      pokemon.abilities = pokemon.abilities.filter(
        (ability: { is_hidden: boolean }) => !ability.is_hidden
      );
      pokemon.abilities = pokemon.abilities.map(
        (ability: { ability: { name: string } }) => {
          return {
            ability: {
              name: ability.ability.name,
            },
          };
        }
      );
    }

    pokemon = {
      name: name,
      sprites: pokemon.sprites.back_default,
      abilities: pokemon.abilities,
      moves: pokemon.moves,
      forms: pokemon.forms,
    };
    return pokemon;
  } catch (error) {
    console.error(
      `Error al obtener detalles del Pokémon con ID ${name}:`,
      error
    );
    throw error;
  }
};
