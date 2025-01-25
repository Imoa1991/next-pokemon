import { ChangeEvent } from "react";
import { ColumnDef } from "@tanstack/react-table";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetailType {
  name: string;
  sprites: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  forms: Form[];
}

export interface Form {
  id: number;
  is_battle_only: boolean;
}
export type PokemonAction =
  | { type: "SET_POKEMON_LIST"; payload: Pokemon[] }
  | {
      type: "SET_POKEMON_DETAILS";
      payload: { name: string; data: PokemonDetailType };
    }
  | { type: "SET_SEARCH_QUERY"; payload: string };

export interface PokemonState {
  pokemonList: Pokemon[];
  pokemonDetails: Record<string, PokemonDetailType>;
  searchQuery: string;
}

export interface PokemonDetailProps {
  details: PokemonDetailType;
  deleteMove: (moveName: string) => void;
}

export interface SelectGroupItem {
  value: string;
  label: string;
}

export interface SelectGroupContent {
  groupKey: string;
  groupHeading?: string;
  groupItems: SelectGroupItem[];
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSort?: (id: string) => void;
}

export interface PaginationType {
  totalPages: number;
  currentPage: number;
  onCurrentPage: (pageNumber: number) => void;
  onPageSize: (pageNumber: string) => void;
  pageSize: string;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
