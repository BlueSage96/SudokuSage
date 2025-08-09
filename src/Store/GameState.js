import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MODES, sudoku } from "./SudokuUtils";

// inits for various game states
const initialState = {
    isStart: false,
    isPause: false,
    isComplete: false,
    pencilMode: false,
    mistake: 0,
    totalMistakes: 5,
    hints: 0,
    time: 0,
    mode: MODES["easy"],
    board: Array.from({ length: 9 }, () => Array(9).fill(0)),
    qBoard: Array.from({ length: 9 }, () => Array(9).fill(1)),
    originalQBoard: Array.from({ length: 9 }, () => Array(9).fill(1)),
    allEntries: [],
    selectedCell: {
        row: null,
        col: null,
        squares: null,
        cell: null,
    },
    // Undo/Redo state
    history: [],
    currentIndex: -1,
    historyLimit: 10,
};

export const gameState = create(
    persist(
        (set) => ({
            ...initialState,
            // add current state to history
            addToHistory: (qBoardState) => {
                set((state) => {
                    let newHistory = state.history.slice(0, state.currentIndex + 1);
                    newHistory.push(JSON.stringify(qBoardState));
                    if (newHistory.length > state.historyLimit) {
                        newHistory = newHistory.slice(newHistory.length - state.historyLimit);
                    }
                    return { ...state, history: newHistory, currentIndex: newHistory.length - 1};
                })
            },
            // undo last move
            undoMove: () => {
                set((state) => {
                    if (state.currentIndex > 0) {
                        const newIndex = state.currentIndex - 1;
                        const previousState = JSON.parse(state.history[newIndex]);
                        return { ...state, qBoard: previousState, currentIndex: newIndex };
                    }
                    return state;
                })
            },
            //redo last move
            redoMove: () => {
                set((state) => {
                    if (state.currentIndex < state.history.length - 1) {
                        const newIndex = state.currentIndex + 1;
                        const nextState = JSON.parse(state.history[newIndex]);
                        return { ...state, qBoard: nextState, currentIndex: newIndex };
                    }
                    return state;
                });
            },
            startGame: (mode) => {
                const data = sudoku(mode);
                const newState = {
                    ...initialState,
                    board: data.solvedBoard,
                    qBoard: data.unsolvedBoard,
                    originalQBoard: JSON.parse(JSON.stringify(data.unsolvedBoard)),
                    isStart: true,
                    hints: MODES[mode].hints,
                    mistake: 0,
                    totalMistakes: MODES[mode].mistakes,
                    mode: MODES[mode],
                    time: 0,
                    isComplete: false,
                    isPause: false,
                    allEntries: [],
                    selectedCell: { row: null, col: null, squares: null, cell: null },
                    history: [JSON.stringify(data.unsolvedBoard)],
                    currentIndex: 0
                };
                set(newState);
            },
            tryAgain: () => {
                set((state) => {
                    let newBoard = state.qBoard.map((row) => 
                        row.map((item) => {
                            if (item.default) {
                                return item;
                            }
                            return { default: false, value: 0 };
                        })
                    );
                    return { ...state, newBoard, qBoard: JSON.parse(JSON.stringify(state.originalQBoard)),
                             allEntries: [], mistake: 0, isPause: false, isComplete: false, time: 0, 
                             hints: MODES[state.mode.key].hints, history: [JSON.stringify(state.originalQBoard)],
                             selectedCell: { row: null, col: null, squares: null, cell: null}, currentIndex: 0,
                           };
                });
            },
            pauseGame: () => {
                set((state) => ({ ...state, isPause: !state.isPause, isActive: !state.isPause }));
            },
            resumeGame: () => {
                const oldGame = JSON.parse(localStorage.getItem('oldboard'));
                set((state) => ({ ...state, ...oldGame }));
            },
            togglePencilMode: () => {
                set((state) => ({ ...state, pencilMode: !state.pencilMode }));
            },
            changeQBoard: (element) => {
                set((state) => {
                    const row = state.selectedCell.row;
                    const col = state.selectedCell.col;

                    if (row === null || col === null) return state;
                    if (state.qBoard[row][col].default || state.mistake >= state.totalMistakes ) return state;

                    // create deep copy of history
                    let qBoard = JSON.parse(JSON.stringify(state.qBoard));
                    const query = {};

                    if (state.pencilMode) {
                        let pencilValue = qBoard[row][col].pencilValue;
                        if (!Array.isArray(pencilValue)) pencilValue = [];
                        if (pencilValue.includes(element)) {
                            pencilValue = pencilValue.filter((val) => val !== element);
                        } else {
                            pencilValue = [...pencilValue, element].sort();
                        }
                        qBoard[row][col] = {
                            ...qBoard[row][col], value: element, pencilValue
                        };  
                    } else {
                        qBoard[row][col] = {
                            ...qBoard[row][col], value: element, pencilValue: [] //clear pencil notes
                        };
                        if (element !== state.board[row][col]) {
                            query.mistake = state.mistake + 1;
                        }
                    }
                    let entries = [...state.allEntries, [row, col]];
                    // Check for win condition
                    let win = true;
                    qBoard.forEach((boardRow, rowIdx) => {
                        boardRow.forEach((item, colIdx) => {
                            if (item.value != state.board[rowIdx][colIdx]) {
                                win = false;
                            }
                        });
                    });
                    if (win) query.isComplete = true;

                    // Add to history
                    let newHistory = state.history.slice(0, state.currentIndex + 1);
                    newHistory.push(JSON.stringify(qBoard));
                    if (newHistory.length > state.historyLimit) {
                        newHistory = newHistory.slice(newHistory.length - state.historyLimit);
                    }
                    if (query.mistake >= state.totalMistakes) {
                        return { ...state, qBoard, allEntries: entries, ...query, 
                            isComplete: true, history: newHistory, currentIndex: newHistory.length - 1 };
                    }
                    return { ...state, qBoard, allEntries: entries, ...query, history: newHistory, currentIndex: newHistory.length - 1 };
                })
            },
            resetQBoard: () => {
                set((state) => ({
                    ...state, qBoard: JSON.parse(JSON.stringify(state.originalQBoard)), allEntries: [],
                    mistake: 0, time: 0, isComplete: false, selectedCell: { row: null, col: null, squares: null, cell: null },
                    history: [JSON.stringify(state.originalQBoard)], currentIndex: 0, hints: MODES[state.mode.key].hints,
                }));
            },
            quitGame: () => {
                set(initialState);
            },
            setSelectedCell: (row, col) => {
                let sqRow = Math.floor(row / 3) * 3;
                let sqCol = Math.floor(col / 3) * 3;
                const allSquares = [];

                for (let x = sqRow; x < sqRow + 3; x++) {
                    for (let y = sqCol; y < sqCol + 3; y++) {
                        allSquares.push([x, y]);
                    }
                    set((state) => {
                        if (state.isPause || state.isComplete) return state;
                        return { ...state, 
                                selectedCell: {
                                cell: { row, col },
                                squares: allSquares, 
                                row, col,
                              }
                        };
                    });
                }
            },
            giveHint: () => {
                set((state) => {
                    const row = state.selectedCell.row;
                    const col = state.selectedCell.col;

                    if (state.hints <= 0) return state;
                    if (row === null || col === null) return state;
                    if (state.isPause || state.isComplete) return state;

                    let qBoard = JSON.parse(JSON.stringify(state.qBoard));
                    if (qBoard[row][col].default) return state;

                    qBoard[row][col] = {
                        ...qBoard[row][col],
                        value: state.board[row][col],
                        pencilValue: []
                    };
                    // Add to history 
                    let newHistory = state.history.slice(0, state.currentIndex + 1);
                    newHistory.push(JSON.stringify(qBoard));
                    if (newHistory.length > state.historyLimit) {
                        newHistory = newHistory.slice(newHistory.length - state.historyLimit);
                    }
                    return { ...state, qBoard, hints: state.hints - 1, history: newHistory, currentIndex: newHistory.length - 1 };
                });
            },
            increaseTime: () => {
                set((state) => {
                    localStorage.setItem("oldboard", JSON.stringify(state));
                    return { ...state, time: state.time + 1 };
                });
            },
            setTime: (seconds) => {
                set((state) => ({ ...state, time: seconds }));
            },
            setState: (newState) => {
                set((state) => ({ ...state, ...newState}));
            }
        }),
        {
            name: 'sudoku-game'
        }
    )
)