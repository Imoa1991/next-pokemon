import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import { PokemonDetailProps } from "@/types";

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  details,
  deleteMove,
}) => {
  const router = useRouter();
  const { name, sprites, abilities, moves, forms } = details;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-4 text-sm border-gray-400 hover:bg-gray-200"
      >
        Volver
      </Button>

      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text mb-4 uppercase">
        {name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <section>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Abilities
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              {abilities.map((ability) => (
                <li
                  key={ability.ability.name}
                  className="capitalize text-gray-600"
                >
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Forms</h3>
            <ul className="list-disc pl-6 space-y-1">
              {forms.map((form) => (
                <li key={form.id} className="text-gray-600">
                  <span className="font-semibold">ID: </span>
                  <span>{form.id} - </span>
                  <span className="font-semibold">Battle Only:</span>
                  <span>{form.is_battle_only ? "Yes" : "No"}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="flex justify-center items-center">
          {sprites && (
            <div className="relative h-64 w-64">
              <Image
                src={sprites}
                alt={`${name} sprite`}
                fill
                className="object-contain rounded-lg shadow-md"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>
      </div>
      <section>
        <div className="flex items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 pr-4 ">Moves</h3>
          <p className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl font-bold p-4 rounded-full shadow-lg w-12 h-12">
            {moves.length}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {moves
            .sort((a, b) => a.move.url.localeCompare(b.move.url))
            .map((move, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="block text-lg text-gray-700">
                  {move.move.name}
                </span>
                <Button
                  variant="destructive"
                  onClick={() => deleteMove(move.move.name)}
                  className="mt-2 w-full"
                >
                  Eliminar
                </Button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PokemonDetail;
