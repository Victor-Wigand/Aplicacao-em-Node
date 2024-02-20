const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { format } = require("date-fns");
const ptBr = require("date-fns/locale/pt-BR");

class MoviesNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id } = request.user;

    if (!title || !description || !rating || !tags) {
      throw new AppError("Todos os campos devem ser preenchidos!");
    }

    if (rating > 5 || rating < 0) {
      throw new AppError("A nota deve ser entre 0 a 5");
    }
    let dateFormatting = format(new Date(), "yyyy'-'LL'-'dd' 'HH':'mm':'ss", {
      locale: ptBr
    });

    const movieNotes = {
      title,
      description,
      rating,
      user_id: id,
      created_at: dateFormatting,
      updated_at: dateFormatting
    };

    const note_id = await knex("movie_notes")
      .insert(movieNotes)
      .returning("id");

    const tagsInsert = tags.map((name) => {
      return {
        note_id: note_id[0].id,
        user_id: id,
        name
      };
    });

    console.log("TAGS note_id >>>>>>>>>>>>>>>>>", note_id);

    for (let tags of tagsInsert) {
      console.log(tags);
      await knex("movie_tags").insert(tags);
    }

    response.json({ message: "Nota de filme cadastrada com sucesso!" });
  }

  async delete(request, response) {
    const { id } = request.params;

    const noteAlreadyExists = await knex("movie_notes").where({ id }).first();

    if (!noteAlreadyExists) {
      throw new AppError("ID da nota não existente");
    }

    await knex("movie_notes").where({ id }).delete();

    response.json({
      message: "Nota deletada com sucesso",
      note: noteAlreadyExists
    });
  }

  async update(request, response) {
    const { title, description, rating } = request.body;
    const { note_id } = request.params;
    const { user_id } = request.query;

    const userAlreadyExists = await knex("users")
      .where({ id: user_id })
      .first();

    const noteAlreadyExists = await knex("movie_notes")
      .where({ id: note_id })
      .first();

    if (!userAlreadyExists) {
      throw new AppError("ID do usuário não existente");
    }
    if (!noteAlreadyExists) {
      throw new AppError("ID da nota não existente");
    }

    if (rating > 5 || rating < 0) {
      throw new AppError("A nota deve ser entre 0 a 5");
    }

    const note = noteAlreadyExists;
    let dateFormatting = format(new Date(), "yyyy'-'LL'-'dd' 'HH':'mm':'ss", {
      locale: ptBr
    });

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.rating = rating ?? rating;
    note.updated_at = dateFormatting;
    await knex("movie_notes").update(note).where({ id: note.id });

    response.json();
  }

  async showAll(request, response) {
    const { id } = request.user;
    const { title } = request.query;
    let allMoviesNotes;

    if (title) {
      allMoviesNotes = await knex("movie_notes")
        .where({ user_id: id })
        .whereLike("title", `%${title}%`);
    } else {
      allMoviesNotes = await knex("movie_notes").where({ user_id: id });
    }

    const userTags = await knex("movie_tags").where({ user_id: id });

    const allMovieNotessWithTags = allMoviesNotes.map((movieNotes) => {
      const noteTags = userTags.filter((tag) => tag.note_id === movieNotes.id);

      return {
        ...movieNotes,
        tags: noteTags
      };
    });

    response.json(allMovieNotessWithTags);
  }

  async showByid(request, response) {
    const { note_id } = request.params;
    const { id } = request.user;
    const note = await knex("movie_notes")
      .where({ id: note_id, user_id: id })
      .first();

    const tags = await knex("movie_tags").where({ note_id, user_id: id });

    response.json({ note, tags });
  }
}

module.exports = MoviesNotesController;
