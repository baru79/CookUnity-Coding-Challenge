"use client";

import PokemonCard from "@/components/pokemon-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import { usePokemon } from "@/hooks/usePokemon";
import { usePokemonsItems } from "@/hooks/usePokemonsItems";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { battle, cn } from "@/lib/utils";
import { ComboboxItem } from "@/types/combobox-item";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Confetti from "react-confetti";

const PokemonPage = ({}) => {
  const { id } = useParams();
  const { width, height } = useWindowDimensions();
  const [pokemonSelected, setPokemonSelected] = useState<ComboboxItem>({
    value: "",
    label: "",
  });
  const { pokemonsItems } = usePokemonsItems();
  const { pokemon: pokemon1 } = usePokemon(id as string);
  const { pokemon: pokemon2 } = usePokemon(pokemonSelected.value);
  const [battleResult, setBattleResult] = useState("");

  const pokemonItemsToDisplay = pokemonsItems.filter(
    (item) => item.value !== id
  );

  const handleOnSelect = ({ value, label }: ComboboxItem) => {
    setPokemonSelected(
      value === pokemonSelected?.value
        ? { value: "", label: "" }
        : { value, label }
    );
    setBattleResult("");
  };

  const handleBattleButton = () => {
    const hp1 = pokemon1?.stats.find((stat) => stat.stat.name === "hp");
    const hp2 = pokemon2?.stats.find((stat) => stat.stat.name === "hp");
    if (pokemon1 && hp1 && pokemon2 && hp2) {
      const pok1 = { name: pokemon1.name, hp: hp1.base_stat };
      const pok2 = { name: pokemon2.name, hp: hp2.base_stat };
      setBattleResult(battle(pok1, pok2));
    }
  };

  return (
    <div className="grid grid-cols-3">
      <PokemonCard id={`${id}`} />
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full w-20 h-20 text-3xl text-bold text-center content-center justify-center bg-blue-500">
          VS
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg text-bold p-2">Battle with:</p>
            <Combobox
              itemSelected={pokemonSelected}
              items={pokemonItemsToDisplay}
              placeholderButton="Select pokemon..."
              placeholderInput="Search pokemon..."
              onSelect={handleOnSelect}
            />
          </div>
          <Button
            className={cn({
              "cursor-not-allowed": !pokemonSelected?.value,
              "opacity-50": !pokemonSelected?.value,
            })}
            variant={"destructive"}
            onClick={handleBattleButton}
          >
            Battle
          </Button>
          {battleResult && (
            <>
              <Badge className="p-2 text-base justify-center bg-green-500 capitalize">
                {battleResult}
              </Badge>
              <Confetti width={width} height={height} />
            </>
          )}
        </div>
      </div>
      {pokemonSelected?.value && (
        <PokemonCard id={`${pokemonSelected?.value}`} />
      )}
    </div>
  );
};

export default PokemonPage;
