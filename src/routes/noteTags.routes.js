const { Router } = require("express");
const NoteTagsController = require("../controllers/NoteTagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const noteTagsRouter = Router();
const noteTagsController = new NoteTagsController();

noteTagsRouter.use(ensureAuthenticated);

noteTagsRouter.put("/:id", noteTagsController.update);

module.exports = noteTagsRouter;
