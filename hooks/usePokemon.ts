import { getPokemonById } from "@/services/pokemon.service";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

export function usePokemon(id: number | string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemon = async (id: string | number) => {
    try {
      setIsLoading(true);
      const pokemon = await getPokemonById(id);
      if (pokemon) {
        setPokemon(pokemon);
      }
      setIsLoading(false);
    } catch (e) {
      setPokemon(null);
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPokemon(id);
    }
  }, [id]);

  return { pokemon, isLoading, fetchPokemon };
}
