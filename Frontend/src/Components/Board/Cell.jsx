import CellStyles from "styled-components";
const Cells = CellStyles.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%; 
    height: 100%; 
    cursor: pointer; 
    user-select: none; 
    background-color: rgb(30,40,200);
    outline: 1px solid transparent;
    border-radius: 8px;

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

// import { gameState } from "../Game/GameState";
import { useRef } from "react";

function Cell({ row, col }) {
//   const { setSelectedCell, selectedCell, qBoard, board, isPause } = gameState();
  const cellRef = useRef();

  function handleClick() {
    // if (isPause) return;
    cellRef.current?.focus();
    // setSelectedCell(row, col);
  }

  return (
    <>
      <Cells ref={cellRef} onClick={handleClick}></Cells>
    </>
  );
}
export default Cell;
