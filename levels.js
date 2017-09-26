const lvl = ([red, green, blue]) => {
  const orange = red & green;
  const purple = red & blue;
  const cyan = green & blue;
  const white = ~(red | green | blue);
  return {red, green, blue, orange, purple, cyan, white};
}

const levels = {
  1: [
    0b001000011100011111011111,
    0b000000000000000000000000,
    0b000000000000000000000000,
  ],
  30: [
    0b001000011100001110000100,
    0b000001000001100000100000,
    0b001000011100001110000100,
  ]
}

const levelsForRender = Object.keys(levels)
  .reduce((levelsForRender, levelId) => {
    levelsForRender[levelId] = lvl(levels[levelId]);
    return levelsForRender;
  }, {});
