import React from "react";
import PokemonCard from "./pokemon-card";
import Link from "next/link";
import { Result } from "@/types/api";

interface PokemonCardList {
  pokemons: Result[];
}

const PokemonCardList = ({ pokemons }: PokemonCardList) => {
  return (
    <div className="grid grid-cols-4 w-full gap-2">
      {pokemons.map((pokemon: Result) => {
        const id = pokemon.url.split("/").at(-2);
        if (!id) return;
        return (
          <Link href={`pokemon/${id}`} key={id}>
            <PokemonCard id={id} />
          </Link>
        );
      })}
    </div>
  );
};

export default PokemonCardList;
