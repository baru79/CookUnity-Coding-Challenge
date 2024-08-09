import { getPokemons } from "@/services/pokemon.service";
import { ComboboxItem } from "@/types/combobox-item";
import { useEffect, useState } from "react";

export function usePokemonsItems() {
  const [pokemonsItems, setPokemonsItems] = useState<ComboboxItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPokemonsItems = async () => {
    try {
      setIsLoading(true);
      let response = await getPokemons();
      let pokemonsComboboxItems: ComboboxItem[] = [];
      while (response?.next !== null) {
        const paramStr = response?.next.split("?")[1];
        const searchParams = new URLSearchParams(paramStr);
        const offset = Number(searchParams.get("offset"));
        const limit = Number(searchParams.get("limit"));
        if (response) {
          pokemonsComboboxItems = [
            ...pokemonsComboboxItems,
            ...response?.results.map((result) => {
              const id = result.url.split("/").at(-2);
              const nameCapitalized = `${result.name.charAt(0).toUpperCase()}${result.name.slice(1)}`;
              return {
                value: `${id}`,
                label: nameCapitalized,
              };
            }),
          ];
          response = await getPokemons(offset, limit);
        }
      }
      if (response) {
        pokemonsComboboxItems = [
          ...pokemonsComboboxItems,
          ...response?.results.map((result) => {
            const id = result.url.split("/").at(-2);
            const nameCapitalized = `${result.name.charAt(0).toUpperCase()}${result.name.slice(1)}`;
            return {
              value: `${id}`,
              label: nameCapitalized,
            };
          }),
        ];
      }
      const pokemonsComboboxItemsSorted = pokemonsComboboxItems.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setPokemonsItems(pokemonsComboboxItemsSorted);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllPokemonsItems();
  }, []);

  return {
    pokemonsItems,
    isLoading,
  };
}
