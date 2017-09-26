const scale = 3;
const height = 20;
const width = 28;

const Triangle = points => ({dx, dy, color, id}) => {
  const pointsString = points
    .map(([x, y]) => ([(x + dx) * width, (y + dy) * height]))
    .map(p => p.join(','))
    .join(' ');
  return (<polygon points={pointsString} fill={color} strokeWidth="1" stroke="black" vectorEffect="non-scaling-stroke"/>)
}

const TriangleUp = Triangle([[0, 1], [1/2, 0], [1, 1]]);
const TriangleDown = Triangle([[0, 0], [1/2, 1], [1, 0]]);

const colors = ['red', 'green', 'blue', 'cyan', 'orange', 'purple', 'white'];
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
  const {white, purple, orange, cyan, blue, green, red} = props.level;
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

const PieceRenderer = ({piece}) => (
  <ColorCube state={{red: piece}}/>
);

const result = solve(levels[1], groupsWithRotations[0]);

ReactDOM.render(
  <div>
    {Object.keys(result).map(key => (<PieceRenderer key={key} piece={result[key]}/>))}
  </div>,
  document.getElementById('root')
);
