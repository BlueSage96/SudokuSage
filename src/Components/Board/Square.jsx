import Cell from './Cell';
import SquareStyles from 'styled-components';

const Squares = SquareStyles.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 100%;
    height: 100%;
`;

const MiniSquares = SquareStyles.div`
    display: flex;
    gap: 1px;
    width: 100%;
    height: 100%;
`;

// 3x3 squares
function Square({ row, col }) {
  const squares = Array.from({ length: 3 }, () => Array(3).fill(null));
  return (
    <>
      <Squares>
        {squares.map((arr, i) => (
          <MiniSquares key={i}>
            {arr.map((_, k) => (
              <Cell key={k} row={row * 3 + i} col={col * 3 + k} />
            ))}
          </MiniSquares>
        ))}
      </Squares>
    </>
  );
}
export default Square;
