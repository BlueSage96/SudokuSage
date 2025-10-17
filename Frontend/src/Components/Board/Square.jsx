import SquareStyles from "styled-components";

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

import Cell from './Cell';
function Square ({row, col}) {
    const squares = Array(3).fill(null).map(() => Array(3).fill(null));
    return (
        <>
         <Squares>
            {squares.map((arr, i) => (
                <MiniSquares key={i}>
                    {arr.map((_,r) => (
                        <Cell key={r} row={row * 3 + i} col={col * 3 + r}/>
                    ))}
                </MiniSquares>
            ))}
         </Squares>
        </>
    )
}
export default Square;