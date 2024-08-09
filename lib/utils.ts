import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BATTLE_GOAL } from "./constants";
import { Player } from "@/types/player";
import { Result } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Option {
  key: string;
}

export function getIntersection(option: Option, data: Result[][]) {
  if (data.length === 0) return [];
  const key = option.key;
  return data?.reduce((acc, currentValue) => {
    return acc.filter((res) =>
      currentValue.find(
        (value) => value[key as keyof Result] === res[key as keyof Result]
      )
    );
  });
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function battle(player1: Player, player2: Player) {
  // Calculate random number for both players by multiply HP with a random factor
  const player1Value = Math.ceil(player1.hp * getRandomNumber(1, 10));
  const player2Value = Math.ceil(player2.hp * getRandomNumber(1, 10));

  // Calculate the absolute difference between player1 and BATTLE_GOAL, store it in x1
  const x1 = Math.abs(BATTLE_GOAL - player1Value);

  // Calculate the absolute difference between player2 and BATTLE_GOAL, store it in y1
  const y1 = Math.abs(BATTLE_GOAL - player2Value);

  if (x1 > y1) {
    // Return x if x is closer to BATTLE_GOAL
    return `${player1.name} wins!`;
  }

  // Return y if y is closer to BATTLE_GOAL
  if (y1 > x1) {
    return `${player2.name} wins!`;
  }

  // Return 0 if x and y are equidistant from BATTLE_GOAL
  return "No winners - try again!";
}
