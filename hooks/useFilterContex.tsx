import { FilterContext } from "@/context/filter-context";
import { useContext } from "react";

export default function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Please use filter provider in the parent element");
  }

  return context;
}
