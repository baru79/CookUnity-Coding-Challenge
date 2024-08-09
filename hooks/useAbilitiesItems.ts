import { getAbilities } from "@/services/pokemon.service";
import { ComboboxItem } from "@/types/combobox-item";
import { useEffect, useState } from "react";

export function useAbilitiesItems() {
  const [abilitiesItems, setAbilitiesItems] = useState<ComboboxItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAbilitiesItems = async () => {
    try {
      setIsLoading(true);
      let response = await getAbilities();
      let abilitiesComboboxItems: ComboboxItem[] = [];
      while (response?.next !== null) {
        const paramStr = response?.next.split("?")[1];
        const searchParams = new URLSearchParams(paramStr);
        const offset = Number(searchParams.get("offset"));
        const limit = Number(searchParams.get("limit"));
        if (response) {
          abilitiesComboboxItems = [
            ...abilitiesComboboxItems,
            ...response?.results.map((result) => {
              const id = result.url.split("/").at(-2);
              const nameCapitalized = `${result.name.charAt(0).toUpperCase()}${result.name.slice(1)}`;
              return {
                value: `${id}`,
                label: nameCapitalized,
              };
            }),
          ];
          response = await getAbilities(offset, limit);
        }
      }
      if (response) {
        abilitiesComboboxItems = [
          ...abilitiesComboboxItems,
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
      const abilitiesComboboxItemsSorted = abilitiesComboboxItems.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setAbilitiesItems(abilitiesComboboxItemsSorted);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllAbilitiesItems();
  }, []);

  return {
    abilitiesItems,
    isLoading,
  };
}
