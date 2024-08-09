import { Ability } from "@/types/ability";
import api from "./api.services";
import { Api } from "@/types/api";
import { Pokemon } from "@/types/pokemon";
import { Type } from "@/types/type";

export async function getPokemons(
  offset?: number,
  limit?: number
): Promise<Api | undefined> {
  try {
    const { data } = await api.get(`/pokemon/?offset=${offset}&limit=${limit}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function getPokemonById(
  id: string | number
): Promise<Pokemon | undefined> {
  try {
    const { data } = await api.get(`/pokemon/${id}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function getTypes(
  offset?: number,
  limit?: number
): Promise<Api | undefined> {
  try {
    const { data } = await api.get(`/type/?offset=${offset}&limit=${limit}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function getPokemonsByType(
  type: string | number
): Promise<Type | undefined> {
  try {
    const { data } = await api.get(`/type/${type}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function getAbilities(
  offset?: number,
  limit?: number
): Promise<Api | undefined> {
  try {
    const { data } = await api.get(`/ability/?offset=${offset}&limit=${limit}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function getPokemonsByAbility(
  ability: string | number
): Promise<Ability | undefined> {
  try {
    const { data } = await api.get(`/ability/${ability}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}
