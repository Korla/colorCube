const rotations = [12, 4, 4, -3, -3, 14, 7, 7, -1, -1, -8, -8, 8, 8, 1, 1, -7, -7, -14, 3, 3, -4, -4, -12]

const rotate = piece =>
  rotations
    .map((delta, i) => delta > 0 ?
        (piece & Math.pow(2, 23 - i)) >> delta :
        (piece & Math.pow(2, 23 - i)) << -delta
    )
    .reduce((prev, curr) => prev | curr);

const flatten = array => array.reduce((prev, curr) => prev.concat(curr));
