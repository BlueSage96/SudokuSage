const express = require('express');
const router = express.Router();

const {getAllGames, getGameById, createGame, updateGame, deleteGame} = require('../controllers/game');
router.route('/').post(createGame).get(getAllGames);
router.route('/:id').get(getGameById).delete(deleteGame).patch(updateGame);

module.exports = router;