import CellStyle from 'styled-components';
// Draw individuals cells & styling
const Cells = CellStyle.div`
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(30,40,200);
    outline: 1px solid transparent';
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 0.375rem;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s, outline 0.2s;
      
    &:hover { 
        outline: 4px solid skyblue;
        outline-offset: -2px;
        z-index: 2;
    }

   &.selected {
    background-color: black; 
    outline: 2px solid #3b82f6; 
   }

  &.related {
    background-color: black;
  }
`;

const CellValue = CellStyle.span`
  font-size: 40px;

  @media (min-width: 768px) {
    font-size: 40px;
  }

  &.default {
    color: white; /* gray-400 */
  }

  &.correct {
    color: #3b82f6; /* blue-600 */
  }

  &.incorrect {
    color: #dc2626; /* red-600 */
  }
`;

const PencilValue = CellStyle.span`
  color: #16a34a; /* green-600 */
  font-size: 18px;
  position: absolute;
  top: -0.25rem;
  right: 0.25rem; //18px
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

import { gameState } from '../../Store/GameState';
import { useRef } from 'react';

function Cell({ row, col }) {
  const { setSelectedCell, selectedCell, qBoard, board, isPause } = gameState();
  const cellRef = useRef();

  function handleClick() {
     if (isPause) return;
     cellRef.current?.focus();
     setSelectedCell(row, col);
  }

  function isSelected() {
    const query = { other: false, current: false };
    if (selectedCell.cell) {
      selectedCell.squares.forEach((sq) => {
          if (sq[0] === row && sq[1] === col) query.other = true;
      });
      if (selectedCell.row === row) query.other = true;
      if (selectedCell.col === col) query.other = true;
      
      if (qBoard[row][col].value === qBoard[selectedCell.row][selectedCell.col].value && qBoard[row][col].value !== 0) {
         query.other = true;
      }
      if (selectedCell.cell.row === row && selectedCell.cell.col === col) {
         query.current = true;
      }
    }
    return query;
  }

  const { current, other } = isSelected();
  
  return (
      <>
        <Cells ref={cellRef} onClick={handleClick} className={`${current ? 'selected' : ''} ${other ? 'related' : ''}`}>
            {qBoard[row][col].value !== 0 && (
                <CellValue className={qBoard[row][col].default ? 'default' : qBoard[row][col].value === board[row][col] ? 
                  'correct' : 'incorrect'}>{qBoard[row][col].value}</CellValue>)}
            {qBoard?.[row]?.[col]?.pencilValue?.length > 0 && !qBoard[row][col].default && (
                <PencilValue>{qBoard[row][col].pencilValue}</PencilValue>
            )}
        </Cells>
      </>
  );
}
export default Cell;
