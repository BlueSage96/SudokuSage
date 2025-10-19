import { useState, useEffect, useRef } from "react";
import GFStyles from "../../css/GameFunc.module.css";
import api from "../Axios.js";
import Logout from "../LogReg/Logout";

export function ShowGames({ inputEnabled,enableInput, setDiv, token, handleToken, setMessage, setEditGameId }) {
  const [games, setGames] = useState([]);
  let gamesTableRef = useRef();
  let gamesTableHeadRef = useRef();
  const logOffRef = useRef();
  const addGameRef = useRef();
  const [difficulty, setDifficulty] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [hints, setHints] = useState("");
  const [status, setStatus] = useState("");
  
  function handleDifficulty(event) {
    setDifficulty(event.target.value);
  }

  function handleMistakes(event) {
    setMistakes(event.target.value);
  }

  function handleHints(event) {
    setHints(event.target.value);
  }

  function handleStatus(event) {
     setStatus(event.target.value);
  }

  useEffect(() => {
    if (!token) return; //don't fetch if not logged in
    const handleShowGame = async () => {
      try {
        enableInput(false);
        //leave this one alone!!
        const response = await api.get(`/game/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        if (response.status === 200) {
          setGames(data.games || []);
        } else {
          setMessage(data.msg);
        }
      } catch (err) {
        console.log(err);
        setMessage("A communications error has occurred");
      }
      enableInput(true);
      setDiv("games");
    };
    handleShowGame();
  }, [setMessage, token]);//enableInput and setDiv causes problems in depend array!

  const addGames = async () => {
      // check for incomplete form
      if (!difficulty || !mistakes || !hints || !status) {
         setMessage("Please complete all fields.");
         return;
      }
   
      enableInput(false);
      try {
        const payload = {
           difficulty,
           mistakes: parseInt(mistakes) || 0,
           usedHints: parseInt(hints) || 0,
           status,
        }
        const response = await api.post(`/game`,payload,
          {headers: { Authorization: `Bearer ${token}`}}
        );
        const data = await response.data;
        // check for 201 as well!!
        if (response.status === 200 || response.status === 201) {
          // set a message!!
          setMessage("Game has been created!")
          // leave setters blank ("") to reset them
          setDifficulty(data.game.difficulty);
          setMistakes(data.game.mistakes);
          setHints(data.game.usedHints);
          setStatus(data.game.status);
          
          // refreshes game list
           try {
             const refreshed = await api.get("/game", {
               headers: { Authorization: `Bearer ${token}` },
             });
             const newList = refreshed.data?.games || [];
             setGames(newList);
           } catch (refreshErr) {
             console.error("Failed to refresh game list:", refreshErr);
           }

          setDiv("games");
        } else {
          setMessage("The games entry was not found");//add data.msg
          // setDiv("games");
        }
      } catch (err) {
        console.log(err);
        setMessage("A communications error has occurred");
      }
      enableInput(true);
  };

  return (
    <>
      <p className={GFStyles.GameMsg}></p>
      <div className={GFStyles.GamesTableContainer}>
        <table className={GFStyles.GamesTable} ref={gamesTableRef}>
          <thead>
            <tr className={GFStyles.GamesTableHeader} ref={gamesTableHeadRef}>
              <th>Difficulty</th>
              <th>Mistakes</th>
              <th>Hints</th>
              <th>Status</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {games.length === 0 ? (
              <tr>
                <td>No games found</td>
              </tr>
            ) : (
              games.map((game) => (
                <tr className={GFStyles.GamesTableContent} key={game._id}>
                  <td>{game.difficulty}</td>
                  <td className={GFStyles.MistTB}>{game.mistakes}</td>
                  <td>{game.usedHints}</td>
                  <td>{game.status}</td>
                  <td>
                    {/* add onClick editGames copy & paste from above!! */}
                    <button
                      type="button"
                      className={GFStyles.EditBtnTB}
                      onClick={() => {
                        setEditGameId(game._id);
                        setTimeout(() => setDiv("edit"), 0);
                      }}
                    >
                      {" "}
                      edit{" "}
                    </button>
                  </td>
                  {/* change to dlt at certain screen sizes!! 500-600px */}
                  <td>
                    <button
                      type="button"
                      className={GFStyles.DeleteBtnTB}
                      onClick={() => {
                        setEditGameId(game._id);
                        setTimeout(() => setDiv("delete"), 0);
                      }}
                    >
                      {" "}
                      delete{" "}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>{" "}
      </div>

      <div className={GFStyles.AddGame}>
        <form>
          <div>
            {" "}
            <label htmlFor="difficulty" className={GFStyles.DiffiTxt}>
              Difficulty:
            </label>{" "}
            <input
              type="text"
              value={difficulty}
              onChange={handleDifficulty}
              className={GFStyles.Difficulty}
              placeholder="Easy, Medium, Hard, or Extreme"
            />{" "}
          </div>
          <div>
            {" "}
            <label htmlFor="mistakes" className={GFStyles.MistTxt}>
              Mistakes:{" "}
            </label>{" "}
            <input
              type="text"
              className={GFStyles.Mistakes}
              value={mistakes}
              placeholder="i.e. 0, 1, etc."
              onChange={handleMistakes}
            />{" "}
          </div>
          <div>
            <label htmlFor="hints" className={GFStyles.HintsTxt}>
              Hints:
            </label>
            <input
              type="text"
              className={GFStyles.Hints}
              value={hints}
              placeholder="i.e. 0, 1, etc."
              onChange={handleHints}
            />
          </div>
          <div>
            {" "}
            <label htmlFor="status" className={GFStyles.StatusLb}>
              Status:
            </label>{" "}
            {/* add value & onchange */}
            <select
              className={GFStyles.Status}
              value={status}
              onChange={handleStatus}
            >
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
              <option value="Restarted">Restarted</option>
            </select>
          </div>
          <div className={GFStyles.EditGameBtns}></div>
        </form>
      </div>

      <div className={GFStyles.GameTainer}>
        <button
          type="button"
          className={GFStyles.AddGameBtn}
          ref={addGameRef}
          onClick={() => {
            addGames();
          }}
        >
          {" "}
          Add game{" "}
        </button>{" "}
        <Logout 
          inputEnabled={inputEnabled} enableInput={enableInput} setDiv={setDiv} 
          setMessage={setMessage} token={token}handleToken={handleToken}>
          {" "}
          Log off{" "}
        </Logout>
      </div>
    </>
  );
}

export function HandleEditGames({ editGameId, inputEnabled, enableInput, token, setMessage, setDiv }) {
  const [difficulty, setDifficulty] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [hints, setHints] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // populate form when editGameId changes
  useEffect(() => {
    if (!editGameId) return;
    let cancelled = false;

    const fetchGame = async () => {
      setLoading(true);   
      try {
        const response = await api.get(`/game/${editGameId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (cancelled) return;

        const payload = response.data?.game || response.data;
        setDifficulty(payload.difficulty ?? "");
        setMistakes(String(payload.mistakes ?? ""));
        setHints(String(payload.usedHints ?? ""));
        setStatus(payload.status ?? "Not started");
      } catch (err) {
        console.error(err);
        setMessage("Failed to load game for editing");
        setDiv("games");
      } finally {
        if (!cancelled) enableInput(true);
        setLoading(false);
      }
    };

    fetchGame();
    return () => cancelled = true;//cleanup function
  }, [editGameId, token, enableInput, setMessage, setDiv]);

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    if (!inputEnabled) return;
    if (!editGameId) {
      setMessage("No game selected to update.");
      return;
    }

    enableInput(false);
    try {
      const payload = {
        difficulty,
        mistakes: parseInt(mistakes) || 0,
        usedHints: parseInt(hints) || 0,
        status,
      };

      const resp = await api.patch(`/game/${editGameId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.status === 200 || resp.status === 201) {
        setMessage("The game entry was updated");
        // clear and go back to list
        setDifficulty("");
        setMistakes("");
        setHints("");
        setStatus("");
        setDiv("games");
      } else {
        const data = resp.data || {};
        setMessage(data.msg || "Update failed");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("A communications error has occurred");
    } finally {
      enableInput(true);
    }
  }

  function handleEditCancel() {
    setMessage("Edit canceled!");
    setDiv("games");
  }

  if (!editGameId) {
    // If no id chosen yet, either render nothing or show helpful text
    return <p className={GFStyles.Msg}>Select a game to edit.</p>;
  }

  return (
    <>
      {loading ? (
        <p>Loading game...</p>
      ) : (
        <>
          <form className={GFStyles.EditForm} onSubmit={handleUpdateSubmit}>
            <div>
              <label htmlFor="difficulty" className={GFStyles.DiffiTxt}>
                Difficulty:
              </label>
              <input id="difficulty" type="text" className={GFStyles.Difficulty} value={difficulty}
                placeholder="Easy, Medium, Hard, or Extreme" onChange={(e) => setDifficulty(e.target.value)}/>
            </div>

            <div>
              <label htmlFor="mistakes" className={GFStyles.MistTxt}>
                Mistakes:
              </label>
              <input id="mistakes" type="text" className={GFStyles.Mistakes} value={mistakes} 
              placeholder="i.e. 0, 1, etc." onChange={(e) => setMistakes(e.target.value)}/>
            </div>

            <div>
              <label htmlFor="hints" className={GFStyles.HintsTxt}>
                Hints:
              </label>
              <input id="hints" type="text" className={GFStyles.Hints} value={hints} 
              placeholder="i.e. 0, 1, etc." onChange={(e) => setHints(e.target.value)}/>
            </div>

            <div>
              <label htmlFor="status" className={GFStyles.StatusLb}>
                Status:
              </label>
              <select id="status" className={GFStyles.Status} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
                <option value="Restarted">Restarted</option>
              </select>
            </div>

            <div className={GFStyles.EditGameBtns}>
              <button type="submit" className={GFStyles.EditBtn}>Update</button>
              <button type="button" className={GFStyles.EditCancel} onClick={handleEditCancel}>Cancel</button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export function HandleDeleteGames({ inputEnabled, enableInput, token, setMessage, setDiv, editGameId }) {
  const [difficulty, setDifficulty] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [hints, setHints] = useState("");
  const [status, setStatus] = useState("");
  const deletingGameRef = useRef();
  const deleteCancelRef = useRef();

  console.log("Difficulty:" + difficulty, "Mistakes:" + mistakes, "Hints:" + hints, "Status:" + status);
  
  useEffect(() => {
    if (!editGameId) return;
    let cancelled = false;

    const fetchGame = async () => {
      try {
        
        const response = await api.get(`/game/${editGameId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
        if (cancelled) return;
        const payload = response.data?.game || response.data;
        setDifficulty(payload.difficulty ?? "");
        setMistakes(String(payload.mistakes ?? ""));
        setHints(String(payload.usedHints ?? ""));
        setStatus(payload.status ?? "Not started");
      } catch (err) {
        console.log(err);
        setMessage(`Unable to delete game with id: ${editGameId}`);
      }
      enableInput(true);
    };
    fetchGame();
    return () => cancelled = true;//cleanup function
  },[editGameId, enableInput, setMessage, token]);
 
 async function handleDeleteSubmit() {
   if (!inputEnabled) return;
   if (!editGameId) {
     setMessage("No game selected to delete");
     return;
   }
   enableInput(false);
   try {
    const response = await api.delete(`/game/${editGameId}`, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
     if (response.status === 200 || response.status === 201) {
          setMessage("The game entry was deleted");
          //clear and go back to list
          setDifficulty("");
          setMistakes("");
          setHints("");
          setStatus("");
          setDiv("games");
        } else {
          const data = response.data || {};//empty object
          setMessage(data.msg || "Delete failed");
        }
   } catch (err) {
     console.error("Update failed",err);
     setMessage("A communications error has occurred")
   } finally {
      enableInput(true);
   }
 }
  
  function handleDeleteCancel() {
    setMessage("Delete cancelled!");
    setDiv("games");
  }

  if (!editGameId) {
    // if no id chosen yet, either render nothing or show helpful text
     return <p className={GFStyles.Msg}>Select a game to delete</p>
  }
  return (
    <>
      <div className={GFStyles.DeleteGame}>
        {/* create conditional rendering - only show when deleting use setDiv!! */}
        <button type="submit" className={GFStyles.DltGame} ref={deletingGameRef} onClick={() => {
              setMessage("Game has been deleted!");
              handleDeleteSubmit();
            // setDiv("delete");
          }}>
           Delete
         </button>
         <button type="button" className={GFStyles.DeleteCancel} ref={deleteCancelRef} onClick={handleDeleteCancel}>
           Cancel
         </button>
      </div>
    </>
  );
}