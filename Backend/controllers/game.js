const Game = require('../models/Game');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// Game CRUD operations
const createGame = async (req, res) => {
  if (!req.user?.userId) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' })
  req.body.createdBy = req.user.userId;
  const game = await Game.create(req.body);
  res.status(StatusCodes.CREATED).json({ game });
};

const getAllGames = async (req, res) => {
   const games = await Game.find({createdBy: req.user.userId}).sort('createdAt');
   res.status(StatusCodes.OK).json({games, count: games.length});
};

const getAGame = async (req, res) => {
  // get specific game by game & user Id
   const {
    user:{ userId },
    params:{ id: gameId }
  } = req;
   const game = await Game.findOne({
      _id: gameId, createdBy: userId
   });

   if (!game) {
     throw new NotFoundError(`No game with id ${gameId}`)
   }
   res.status(StatusCodes.OK).json({ game });
};

const updateGame = async (req, res) => {
    const gameId = req.params.id;
    const { difficulty, mistakes, usedHints, status } = req.body;
    // require all params to update
    if (difficulty === '' || mistakes === '' || usedHints === '' || status === '') {
       throw new BadRequestError('Difficulty, mistakes, usedHints, and status fields cannot be empty!')
    }
    const game = await Game.findOneAndUpdate({_id: gameId, createdBy: req.user.userId}, req.body, {new: true, runValidators: true});
     if (!game) {
       throw new NotFoundError(`No game with id ${gameId}`);
     }
     res.status(StatusCodes.OK).json({ game });
};

const deleteGame = async (req, res) => {
    const {
      params: { id: gameId },
    } = req;
    const game = await Game.findOneAndDelete({_id: gameId, createdBy: req.user.userId});
    if (!game) {
      throw new NotFoundError(`No game with id ${gameId}`);
    }
    res.status(StatusCodes.OK).json({ game, msg: "The entry was deleted" });
};

const getGameById = async (req, res) => {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Game not found" });
    res.json({ game });
}

module.exports = { getAllGames, getGameById, createGame, updateGame, deleteGame };
