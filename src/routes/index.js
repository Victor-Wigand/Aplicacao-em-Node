const { Router, static } = require("express");

const usersRouter = require("./users.routes");
const moviesNotesRouter = require("./movies.routes");
const noteTagsRouter = require("./noteTags.routes");
const sessionsRouter = require("./sessions.routes");
const uploadConfig = require("../config/upload");
const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies-notes", moviesNotesRouter);
routes.use("/note-tags", noteTagsRouter);
routes.use("/session", sessionsRouter);

routes.use("/files", static(uploadConfig.UPLOADS_FOLDER));
module.exports = routes;
