import { ComboboxItem } from "@/types/combobox-item";
import { createContext } from "react";

export interface Filter {
  name: string;
  ability: ComboboxItem;
  type: ComboboxItem;
}

export interface FilterContextProps {
  filter: Filter;
  updateFilters: (filter: Partial<Filter>) => void;
}

export const FilterContext = createContext<FilterContextProps | null>({
  filter: {
    name: "",
    ability: {
      value: "",
      label: "",
    },
    type: {
      value: "",
      label: "",
    },
  },
  updateFilters: () => null,
});
