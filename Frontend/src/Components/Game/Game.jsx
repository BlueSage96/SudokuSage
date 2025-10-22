import Board from '../Board/Board';
import GameStyles from '../../css/Game.module.css';
import { useNavigate } from 'react-router-dom';
export default function Game() {
  const navigate = useNavigate();

  return (
    <>
      <button className={GameStyles.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <Board />
    </>
  );
}
