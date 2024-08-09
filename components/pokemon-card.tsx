import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { usePokemon } from "@/hooks/usePokemon";
import { cn } from "@/lib/utils";
import SkeletonCard from "./skeleton-card";

interface Pokemon {
  id: number | string;
  className?: string;
}

const PokemonCard = ({ id, className }: Pokemon) => {
  const { pokemon, isLoading } = usePokemon(id);
  if (isLoading) return <SkeletonCard className="w-96 m-auto" />;
  const hp = pokemon?.stats.find((stat) => stat.stat.name === "hp");
  const types = pokemon?.types.map((type) => type.type.name);
  const abilities = pokemon?.abilities.map((ability) => ability.ability.name);
  const imageSvg = pokemon?.sprites.other.dream_world.front_default;
  const imagePng = pokemon?.sprites.other.home.front_default;
  const image = imageSvg ? imageSvg : imagePng;
  return (
    <Card className={cn("h-full m-auto w-96", className)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-lg capitalize">{pokemon?.name}</p>
          <Badge className="gap-2" variant={"secondary"}>
            <p className="text-sm">HP:</p>
            <span className="text-sm font-extrabold">{hp?.base_stat}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {image && (
          <Image
            className="aspect-square m-auto"
            src={`${image}`}
            width={80}
            height={80}
            alt={`${pokemon?.name}`}
            priority
          />
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col justify-items-left gap-4">
          <div className="flex flex-wrap gap-2">
            <p className="text-sm">Type:</p>
            {types?.map((type, index) => (
              <Badge
                key={`pokemon-${pokemon?.id}-type-${type}-${index}`}
                className="capitalize"
              >
                {type}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="text-sm">Ability:</p>
            {abilities?.map((ability, index) => (
              <Badge
                key={`pokemon-${pokemon?.id}-ability-${ability}-${index}`}
                className="capitalize"
              >
                {ability}
              </Badge>
            ))}
          </div>
          <p className="text-sm">{`Weight: ${pokemon?.weight}`}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
