export const BULLET_TYPE = {
  AXE: "axe",
  EYE: "eye",
  FISH: "fish",
};

export const BULLET_CONFIG = {
  axe: {
    speed: 300,
    damage: 10,
  },
  eye: {
    speed: 200,
    damage: 20,
  },
  fish: {
    speed: 150,
    damage: 30,
  },
};

export const ENEMY_TYPE = {
  SMALL: "small",
  MEDIUM: "medium",
  BIG: "big",
};

export const ENEMY_CONFIG = {
  small: {
    speed: 200,
    hp: 80,
    range: 150,
  },
  medium: {
    speed: 120,
    hp: 100,
    range: 200,
  },
  big: {
    speed: 70,
    hp: 200,
    range: 250,
  },
};
