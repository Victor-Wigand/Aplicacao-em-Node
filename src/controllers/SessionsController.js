const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Usuário ou senha incorreta");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Usuário ou senha incorreta");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
