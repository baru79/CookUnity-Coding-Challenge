"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";
import Combobox from "./ui/combobox";
import { ComboboxItem } from "@/types/combobox-item";
import debounce from "just-debounce-it";
import useFilterContext from "@/hooks/useFilterContex";
import { useAbilitiesItems } from "@/hooks/useAbilitiesItems";
import { useTypesItems } from "@/hooks/useTypesItems";

const Filter = () => {
  const { filter, updateFilters } = useFilterContext();

  const [nameTyped, setNameTyped] = useState(filter?.name);
  const [typeSelected, setTypeSelected] = useState<ComboboxItem>(filter.type);
  const [abilitySelected, setAbilitySelected] = useState<ComboboxItem>(
    filter.ability
  );

  const { typesItems } = useTypesItems();
  const { abilitiesItems } = useAbilitiesItems();

  const debouncedGetPokemon = useCallback(
    debounce(
      (search: string) => updateFilters({ ...filter, name: search }),
      1500
    ),
    [filter]
  );

  const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameTyped(value);
    debouncedGetPokemon(value);
  };

  const handleOnSelectAbility = ({ value, label }: ComboboxItem) => {
    const ability =
      value === abilitySelected?.value
        ? { value: "", label: "" }
        : { value, label };
    setAbilitySelected(ability);
    updateFilters({ ...filter, ability });
  };

  const handleOnSelectType = ({ value, label }: ComboboxItem) => {
    const type =
      value === typeSelected?.value
        ? { value: "", label: "" }
        : { value, label };
    setTypeSelected(type);
    updateFilters({ ...filter, type });
  };

  return (
    <nav className="mb-4 flex gap-2 items-center justify-center">
      <p className="text-lg flex font-bold">Pokemon App</p>
      <Input
        placeholder="Search by name"
        value={nameTyped}
        onChange={handleOnChangeName}
        className="w-48"
      />
      <Combobox
        itemSelected={abilitySelected}
        items={abilitiesItems}
        placeholderButton={"Select ability..."}
        placeholderInput={"Search ability"}
        onSelect={handleOnSelectAbility}
      />
      <Combobox
        itemSelected={typeSelected}
        items={typesItems}
        placeholderButton={"Select type..."}
        placeholderInput={"Search type"}
        onSelect={handleOnSelectType}
      />
    </nav>
  );
};

export default Filter;
