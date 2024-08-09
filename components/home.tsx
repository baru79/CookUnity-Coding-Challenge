"use client";

import React, { useState } from "react";
import PokemonCardList from "./pokemon-card-list";
import Filter from "./filter";
import Navigation from "./navigation";
import { LIMIT, OFFSET } from "@/lib/constants";
import useHome from "@/hooks/useHome";

const Home = () => {
  const [offset, setOffset] = useState(OFFSET);
  const { pokemons, pokemonsWithoutFilters, totalPokemons, isLoading } =
    useHome(offset, LIMIT);

  const isDisabledPrevious = offset - LIMIT >= 0;
  const isDisabledNext = offset + LIMIT <= totalPokemons;
  const showFooter = pokemonsWithoutFilters.length > 0;

  const handleClickPrevious = () => {
    if (isDisabledPrevious) {
      setOffset((prevOffset) => prevOffset - LIMIT);
    }
  };

  const handleClickNext = () => {
    if (isDisabledNext) {
      setOffset((prevOffset) => prevOffset + LIMIT);
    }
  };

  return (
    <>
      <Filter />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <PokemonCardList pokemons={pokemons} />
          {showFooter && (
            <footer className="mt-4">
              <Navigation
                isDisabledPrevious={isDisabledPrevious}
                isDisabledNext={isDisabledNext}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
              />
            </footer>
          )}
        </>
      )}
    </>
  );
};

export default Home;
