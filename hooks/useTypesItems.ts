import { getAbilities, getTypes } from "@/services/pokemon.service";
import { ComboboxItem } from "@/types/combobox-item";
import { useEffect, useState } from "react";

export function useTypesItems() {
  const [typesItems, setTypesItems] = useState<ComboboxItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllTypesItems = async () => {
    try {
      setIsLoading(true);
      let response = await getTypes();
      let typesComboboxItems: ComboboxItem[] = [];
      while (response?.next !== null) {
        const paramStr = response?.next.split("?")[1];
        const searchParams = new URLSearchParams(paramStr);
        const offset = Number(searchParams.get("offset"));
        const limit = Number(searchParams.get("limit"));
        if (response) {
          typesComboboxItems = [
            ...typesComboboxItems,
            ...response?.results.map((result) => {
              const id = result.url.split("/").at(-2);
              const nameCapitalized = `${result.name.charAt(0).toUpperCase()}${result.name.slice(1)}`;
              return {
                value: `${id}`,
                label: nameCapitalized,
              };
            }),
          ];
          response = await getTypes(offset, limit);
        }
      }
      if (response) {
        typesComboboxItems = [
          ...typesComboboxItems,
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
      const typesComboboxItemsSorted = typesComboboxItems.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setTypesItems(typesComboboxItemsSorted);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllTypesItems();
  }, []);

  return {
    typesItems,
    isLoading,
  };
}
