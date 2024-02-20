const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NoteTagsController {
  async update(request, response) {
    const { name } = request.body;
    const { user_id } = request.query;
    const { id } = request.params;

    const userAlreadyExists = await knex("users")
      .where({ id: user_id })
      .first();

    if (!userAlreadyExists) {
      throw new AppError("ID de usuário não existente");
    }

    let tag = await knex("movie_tags").where({ id }).first();

    tag.name = name ?? tag.name;

    await knex("movie_tags").update(tag).where({ id });

    response.json({ message: "Nome da Tag foi atualizado com sucesso!" });
  }
}

module.exports = NoteTagsController;
