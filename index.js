const scale = 8;
const height = 20;
const width = 28;

const flatten = array => array.reduce((prev, curr) => prev.concat(curr))

const Triangle = points => ({dx, dy}) => {
  const pointsString = points
    .map(([x, y]) => ([(x + dx) * width, (y + dy) * height]))
    .map(p => p.join(','))
    .join(' ');
  return (<polygon points={pointsString} fill="lime" stroke="black" strokeWidth="1" vectorEffect="non-scaling-stroke"/>)
}

const TriangleUp = Triangle([[0, 1], [1/2, 0], [1, 1]]);
const TriangleDown = Triangle([[0, 0], [1/2, 1], [1, 0]]);

const generateTriangles = (start, number, dx, dy, startUp) => {
  const triangles = [];
  for(let i = start; i < start + number; i++) {
    const isEven = !((i+startUp)%2);
    const props = {
      key: i,
      dx: dx + (i - start)/2,
      dy
    }
    const triangle = isEven ?
      <TriangleUp {...props}/> :
      <TriangleDown {...props}/>;
    triangles.push(triangle);
  }
  return triangles;
}

const ColorCube = () => {
  const rows = [
    [0, 5, 1/2, 0, 0],
    [5, 7, 0, 1, 1],
    [12, 7, 0, 2, 1],
    [19, 5, 1/2, 3, 0]
  ];
  const trianglesByRow = rows.map(args => generateTriangles(...args));
  const triangles = flatten(trianglesByRow);
  return (
    <svg height={height * scale} width={width * scale} viewBox={`0 0 ${3 * height} ${3 * width}`} preserveAspectRatio="xMinYMin">
      {triangles}
    </svg>
  );
}

ReactDOM.render(<ColorCube/>, document.getElementById('root'));
