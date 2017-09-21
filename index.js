const scale = 4;
const height = 20;
const width = 28;

const flatten = array => array.reduce((prev, curr) => prev.concat(curr))

const Triangle = points => ({dx, dy, color, id}) => {
  const pointsString = points
    .map(([x, y]) => ([(x + dx) * width, (y + dy) * height]))
    .map(p => p.join(','))
    .join(' ');
  return (<polygon points={pointsString} fill={color} stroke="black" strokeWidth="1" vectorEffect="non-scaling-stroke"/>)
}

const TriangleUp = Triangle([[0, 1], [1/2, 0], [1, 1]]);
const TriangleDown = Triangle([[0, 0], [1/2, 1], [1, 0]]);

const colors = ['white', 'purple', 'orange', 'cyan', 'blue', 'green', 'red'];
colors.reverse();
const getColor = (state, id) => colors
  .reduce((color, possibleColor) => id & state[possibleColor] ? possibleColor : color, 'grey');

const generateTriangles = (state) => ([start, number, dx, dy, startUp]) => {
  const triangles = [];
  for(let key = start; key < start + number; key++) {
    const id = Math.pow(2, 23 - key);
    const color = getColor(state, id);
    const props = {
      key,
      dx: dx + (key - start)/2,
      dy,
      color
    };
    const isEven = !((key + startUp) % 2);
    const triangle = isEven ?
      <TriangleUp {...props}/> :
      <TriangleDown {...props}/>;
    triangles.push(triangle);
  }
  return triangles;
}

const ColorCube = ({state, color}) => {
  const rows = [
    [0, 5, 1/2, 0, 0],
    [5, 7, 0, 1, 1],
    [12, 7, 0, 2, 1],
    [19, 5, 1/2, 3, 0]
  ];
  const trianglesByRow = rows.map(generateTriangles(state, color));
  const triangles = flatten(trianglesByRow);
  return (
    <svg height={height * scale} width={width * scale} viewBox={`0 0 ${3 * height} ${3 * width}`} preserveAspectRatio="xMinYMin">
      {triangles}
    </svg>
  );
}

const LevelSplit = (props) => {
  const {white, purple, orange, cyan, blue, green, red} = props;
  return (
    <div>
      <div>
        <ColorCube state={props}/>
      </div>
      <div>
        <ColorCube state={{red}}/>
        <ColorCube state={{green}}/>
        <ColorCube state={{blue}}/>
      </div>
      <div>
        <ColorCube state={{orange}}/>
        <ColorCube state={{purple}}/>
        <ColorCube state={{cyan}}/>
      </div>
      <div>
        <ColorCube state={{white}}/>
      </div>
    </div>
  )
}

const rotations = [12, 4, 4, -3, -3, 14, 7, 7, -1, -1, -8, -8, 8, 8, 1, 1, -7, -7, -14, 3, 3, -4, -4, -12]

const salmon = piece =>
  rotations
    .map((delta, i) => delta > 0 ?
        (piece & Math.pow(2, 23 - i)) >> delta :
        (piece & Math.pow(2, 23 - i)) << -delta
    )
    .reduce((prev, curr) => prev | curr)

const piece1 = 0b111110111110001110000100;
const piece2 = 0b110001100000110000011000;
const piece3 = 0b111111100011000000000000;
const piece4 = 0b111111100011000000000000;

const PieceRenderer = ({piece}) => (
  <div>
    <ColorCube state={{red: piece}}/>
    <ColorCube state={{red: salmon(piece)}}/>
    <ColorCube state={{red: salmon(salmon(piece))}}/>
    <ColorCube state={{red: salmon(salmon(salmon(piece)))}}/>
    <ColorCube state={{red: salmon(salmon(salmon(salmon(piece))))}}/>
    <ColorCube state={{red: salmon(salmon(salmon(salmon(salmon(piece)))))}}/>
  </div>
)

ReactDOM.render(
  <div>
    <LevelSplit {...levels[30]}/>
    <PieceRenderer piece={piece1}/>
    <PieceRenderer piece={piece2}/>
    <PieceRenderer piece={piece3}/>
    <PieceRenderer piece={piece4}/>
  </div>,
  document.getElementById('root'));
