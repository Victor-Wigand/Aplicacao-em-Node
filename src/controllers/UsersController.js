const { hash, compare } = require("bcrypt");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { format } = require("date-fns");
const ptBr = require("date-fns/locale/pt-BR");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Os todos campos devem ser preenchidos!");
    }

    const userEmailExists = await knex("users").where({ email }).first();

    if (userEmailExists) {
      throw new AppError("Email de usuário já cadastrado!");
    }

    const passwordHashed = await hash(password, 8);
    let dateFormatting = format(new Date(), "yyyy'-'LL'-'dd' 'HH':'mm':'ss", {
      locale: ptBr
    });

    const newUser = {
      name,
      email,
      password: passwordHashed,
      created_at: dateFormatting,
      updated_at: dateFormatting
    };

    await knex("users").insert(newUser);

    return response.json({ message: "Usuario criado com sucesso", newUser });
  }

  async update(request, response) {
    const { name, email, password } = request.body;
    let { newPassword } = request.body;
    const { id } = request.user;

    const userExists = await knex("users").where({ id }).first();

    if (!userExists) {
      throw new AppError("ID de usuário não existente");
    }
    if (!password) {
      throw new AppError(
        "Você precisa informar a senha antiga para modificar os dados"
      );
    }
    if (email) {
      const EmailAlreadyExist = await knex("users").where({ email }).first();

      if (EmailAlreadyExist && EmailAlreadyExist.id != id) {
        throw new AppError("E-mail de usuário já cadastrado");
      }
    }

    const user = userExists;

    const checkOldPassword = await compare(password, user.password);

    if (!checkOldPassword) {
      throw new AppError("Senha atual invalida!");
    }

    if (newPassword != "") {
      newPassword = await hash(newPassword, 8);
    } else {
      newPassword = null;
    }
    let dateFormatting = format(new Date(), "yyyy'-'LL'-'dd' 'HH':'mm':'ss", {
      locale: ptBr
    });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = newPassword ?? user.password;
    user.updated_at = dateFormatting;

    await knex("users").where({ id }).update(user);

    response.json({ message: "Usuário modificado com sucesso" });
  }

  async delete(request, response) {
    const { id } = request.params;

    const userAlreadyExists = await knex("users").where({ id }).first();

    if (!userAlreadyExists) {
      throw new AppError("ID de usuário não existente");
    }

    await knex("users").where({ id }).delete();
    const user = userAlreadyExists;
    response.json({ message: "Usuário deletado com sucesso!", user });
  }
}

module.exports = UsersController;
