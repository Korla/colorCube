const isContained = (layer, piece) => (piece & ~layer) === 0;

const solve = (level, pieces) => {
  const layer = level[0];
  const piece = pieces[0][0];
  const result = isContained(layer, piece);
  return {layer, piece}
}
