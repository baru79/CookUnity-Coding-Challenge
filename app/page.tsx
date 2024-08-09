import Home from "@/components/home";
import { FilterContextProvider } from "@/provider/filter-context-provider";

export default function HomePage() {
  return (
    <FilterContextProvider>
      <Home />
    </FilterContextProvider>
  );
}
