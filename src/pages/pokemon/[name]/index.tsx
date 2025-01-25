import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { usePokemon } from "@/hooks/usePokemon";
import PokemonDetail from "@/components/PokemonDetail";
import Spinner from "@/components/Spinner";

export default function PokemonDetailPage() {
  const router = useRouter();
  const { name } = router.query;
  const { state, getDetails, updatePokemonDetails } = usePokemon();

  useEffect(() => {
    if (name) {
      getDetails(name as string);
    }
  }, [name]);

  const details = state.pokemonDetails[name as string];

  if (!details) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const deleteMove = (moveName: string) => {
    const newMoves = details.moves.filter(
      (move) => move.move.name !== moveName
    );
    const updatedDetails = { ...details, moves: newMoves };

    updatePokemonDetails(updatedDetails);
  };

  return <PokemonDetail details={details} deleteMove={deleteMove} />;
}
