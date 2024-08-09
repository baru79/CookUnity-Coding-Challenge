"use client";

import { Filter, FilterContext } from "@/context/filter-context";
import { ReactNode, useState } from "react";

export function FilterContextProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>({
    name: "",
    ability: {
      value: "",
      label: "",
    },
    type: {
      value: "",
      label: "",
    },
  });

  const updateFilters = async (values: Partial<Filter>) => {
    const newFilter = { ...filter, ...values };
    setFilter(newFilter);
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
