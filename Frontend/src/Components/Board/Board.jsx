import BoardStyles from '../../css/Board.module.css';
import Square from './Square';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../Auth/Axios';

function Board() {
  const squares = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null)); //3x3
  const numbers = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const gameId = id || state?.gameId;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!gameId) {
      setError('No game ID found');
      setLoading(false);
      return;
    }
    if (!token) {
      // not logged in – back to setup/login
      navigate('/setup');
      return;
    }

    (async () => {
      try {
        const { data } = await api.get(`/game/${gameId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setGame(data.game);
      } catch (err) {
        // surface the actual HTTP status/message if available
        const msg = err?.response?.data?.msg || 'Unable to load game';
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [gameId, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!game) return <p>No game data</p>;

  return (
    <>
      <div className={BoardStyles.Container}>
        <h2>Mode: {game.difficulty}</h2>
        <p>Mistakes: {game.mistakes}</p>
        <p>Hints: {game.hints}</p>
      </div>

      {/* draw grid */}
      <div className={BoardStyles.Main}>
        {/* 3x3 x 2 */}
        {squares.map((arr, rowIdx) => (
          <div key={rowIdx} className={BoardStyles.Rows}>
            {arr.map((_, colIdx) => (
              <Square key={colIdx} rowIdx={rowIdx} colIdx={colIdx} />
            ))}
          </div>
        ))}
      </div>
      {/* draw numbers below board */}
      <div className={BoardStyles.NumContainer}>
        {numbers.map((_, i) => (
          <span key={i} className={BoardStyles.NumRow}>
            {i + 1}
          </span>
        ))}
      </div>
    </>
  );
}
export default Board;
