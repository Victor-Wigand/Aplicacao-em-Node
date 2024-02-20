const { Router } = require("express");
const multer = require("multer");
const UserAvatarController = require("../controllers/UserAvatarController");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../config/upload");

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.MULTER);

usersRouter.post("/", usersController.create);

usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.delete("/:id", ensureAuthenticated, usersController.delete);
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);
module.exports = usersRouter;
