import { getIntersection } from "@/lib/utils";
import {
  getPokemonById,
  getPokemons,
  getPokemonsByAbility,
  getPokemonsByType,
} from "@/services/pokemon.service";
import { Result } from "@/types/api";
import { useEffect, useState } from "react";
import useFilterContext from "./useFilterContex";

export default function useHome(offset?: number, limit?: number) {
  const [totalPokemons, setTotalPokemons] = useState(0);
  const { filter } = useFilterContext();

  const [pokemonsWithoutFilters, setPokemonsWithoutFilters] = useState<
    Result[]
  >([]);
  const [pokemonsNameResults, setPokemonsNameResults] = useState<Result[]>([]);
  const [pokemonsAbilityResults, setPokemonsAbilityResults] = useState<
    Result[]
  >([]);
  const [pokemonsTypeResults, setPokemonsTypeResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemons = async (offset?: number, limit?: number) => {
    try {
      setIsLoading(true);
      const response = await getPokemons(offset, limit);
      if (response) {
        setTotalPokemons(response.count);
        setPokemonsWithoutFilters([...response.results]);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPokemonByName = async (name: string) => {
    try {
      if (name) {
        setIsLoading(true);
        try {
          const response = await getPokemonById(name);
          if (response) {
            setPokemonsWithoutFilters([]);
            setPokemonsNameResults([
              {
                name: response.name,
                url: `https://pokeapi.co/api/v2/pokemon/${response.id}/`,
              },
            ]);
          }
        } catch (error) {
          setPokemonsNameResults([
            {
              name,
              url: "",
            },
          ]);
        }
        setIsLoading(false);
      } else {
        setPokemonsNameResults([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPokemonsByAbility = async (ability: string | number) => {
    try {
      if (ability) {
        setIsLoading(true);
        const response = await getPokemonsByAbility(ability);
        if (response) {
          const pokemons = response.pokemon.map((pok) => pok.pokemon);
          setPokemonsAbilityResults(pokemons);
        } else {
          setPokemonsAbilityResults([]);
        }
        setIsLoading(false);
      } else {
        setPokemonsAbilityResults([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPokemonsByType = async (type: string | number) => {
    try {
      if (type) {
        setIsLoading(true);
        const response = await getPokemonsByType(type);
        if (response) {
          const pokemons = response.pokemon.map((pok) => pok.pokemon);
          setPokemonsTypeResults(pokemons);
        } else {
          setPokemonsTypeResults([]);
        }
        setIsLoading(false);
      } else {
        setPokemonsTypeResults([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPokemons(offset, limit);
  }, [offset]);

  useEffect(() => {
    const { name, type, ability } = filter;
    if (name === "" && type.value === "" && ability.value === "") {
      setPokemonsNameResults([]);
      setPokemonsAbilityResults([]);
      setPokemonsTypeResults([]);
      fetchPokemons(offset, limit);
    } else {
      setPokemonsWithoutFilters([]);
      fetchPokemonByName(name);
      fetchPokemonsByAbility(ability.value);
      fetchPokemonsByType(type.value);
    }
  }, [filter]);

  let data: Result[][] = [];

  if (pokemonsNameResults.length > 0) {
    data = [...data, pokemonsNameResults];
  }
  if (pokemonsAbilityResults.length > 0) {
    data = [...data, pokemonsAbilityResults];
  }
  if (pokemonsTypeResults.length > 0) {
    data = [...data, pokemonsTypeResults];
  }
  const pokemons = [
    ...pokemonsWithoutFilters,
    ...getIntersection({ key: "name" }, data),
  ];

  return {
    pokemons,
    pokemonsWithoutFilters,
    pokemonsNameResults,
    pokemonsAbilityResults,
    pokemonsTypeResults,
    totalPokemons,
    isLoading,
  };
}
