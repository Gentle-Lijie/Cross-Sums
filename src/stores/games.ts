export const MaxHP = 100;

export interface Game {
  id: number;
  name: string;
  hp: number;
}

export const games: Game[] = [
  { id: 1, name: "Game 1", hp: MaxHP },
  { id: 2, name: "Game 2", hp: MaxHP },
  { id: 3, name: "Game 3", hp: MaxHP },
];
