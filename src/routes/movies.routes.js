const { Router } = require("express");
const MoviesNotesController = require("../controllers/MoviesNotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const moviesRouter = Router();
const moviesNotesController = new MoviesNotesController();

moviesRouter.use(ensureAuthenticated);

moviesRouter.post("/", moviesNotesController.create);
moviesRouter.delete("/:id", moviesNotesController.delete);
moviesRouter.put("/:note_id", moviesNotesController.update);
moviesRouter.get("/", moviesNotesController.showAll);
moviesRouter.get("/:note_id", moviesNotesController.showByid);

module.exports = moviesRouter;
