
# Filmes Notes API

Está é uma API para criação de notas para filmes, onde o usuário cadastra um filme, preenche com algumas informações (nome, descrição, nota) e cria tags relacionadas a ele.
## Documentação da API


## Rotas do usuário

### Criação do usuário

```http
  POST /api/users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name.body` | `string` | **Obrigatório**. Nome do usuário. |
| `email.body` | `string` | **Obrigatório**. E-mail do usuário. |
| `password.body` | `string` | **Obrigatório**. Senha do usuário. |


#### Retorna um objeto

```json
{
	"message": "Usuario criado com sucesso",
	"newUser": {
		"name": "nome do usuário",
		"email": "emaildousuario@gmail.com",
		"password": "$2b$08$dQWdr60J7ZEVRVYdj5dtyOAmT8czQSFadrucGbuKrRGYJmZgRuLuq",
		"created_at": "2022-07-04 17:37:08",
		"updated_at": "2022-07-04 17:37:08"
	}
}
```

### Deletar um usuário

```http
  DELETE /api/users/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id.params` | `string` | **Obrigatório**. ID do usuário a ser deletado. |



#### Retorna um objeto

```json
{
	"message": "Usuário deletado com sucesso!",
	"user": {
		"id": 3,
		"name": "nome do usuário",
		"email": "emaildousuario@gmail.com",
		"password": "$2b$08$dQWdr60J7ZEVRVYdj5dtyOAmT8czQSFadrucGbuKrRGYJmZgRuLuq",
		"avatar": null,
		"created_at": "2022-07-04 17:37:08",
		"updated_at": "2022-07-04 17:37:08"
	}
}
```

### Atualizar um usuário

```http
  PUT /api/users/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name.body` | `string` | Novo nome do usuário . |
| `email.body` | `string` | Novo e-mail do usuário. |
| `password.body` | `string` | **Obrigatório**. Senha atual do usuário. |
| `new_password.body` | `string` | Nova senha do usuário. |
| `id.params` | `string` | **Obrigatório**. ID do usuário. |


#### Retorna um objeto

```json
{
	"message": "Usuário modificado com sucesso"
}
```

## Rotas das notas dos filmes

### Criação de uma nota

```http
  POST /api/movies-notes/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title.body` | `string` | **Obrigatório**. Título do filme. |
| `description.body` | `string` | **Obrigatório**. Descrição do filme. |
| `rating.body` | `string` | **Obrigatório**. Nota que o usuário deu para o filme. |
| `tags.body` | `arrey` | **Obrigatório**. Tags do filme. |
| `id.params` | `string` | **Obrigatório**. ID do usuário. |

#### Retorna um objeto

```json
{
	"message": "Nota de filme cadastrada com sucesso!"
}
```

### Deletar uma nota

```http
  DELETE /api/movies-notes/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id.params` | `string` | **Obrigatório**. ID da nota a ser deletada. |



#### Retorna um objeto

```json
{
	"message": "Nota deletada com sucesso",
	"note": {
		"id": 2,
		"title": "Doutor Estranho no Multiverso da Loucura",
		"description": "Em Doutor Estranho no Multiverso da Loucura, após derrotar Dormammu e enfrentar Thanos nos eventos de Vingadores: Ultimato, o Mago Supremo, Stephen Strange (Benedict Cumberbatch), e seu parceiro Wong (Benedict Wong), continuam suas pesquisas sobre a Joia do Tempo. Mas um velho amigo que virou inimigo coloca um ponto final nos seus planos e faz com que Strange desencadeie um mal indescritível, o obrigando a enfrentar uma nova e poderosa ameaça.",
		"rating": 0,
		"user_id": 1,
		"created_at": "2022-07-04 18:31:50",
		"updated_at": "2022-07-04 18:31:50"
	}
}
```

### Atualização de uma nota

```http
  PUT /api/movies-notes/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title.body` | `string` | Título do filme. |
| `description.body` | `string` | Descrição do filme. |
| `rating.body` | `string` | Nota que o usuário deu para o filme. |
| `user_id.query` | `string` | **Obrigatório**. ID do usuário. |
| `id.params` | `string` | **Obrigatório**. ID da nota. |

#### Retorna um status

```bash
status(200) OK
```

### Listar todas as notas de um usuário

```http
  GET /api/movies-notes/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id.query` | `string` | **Obrigatório**. ID do usuário. |


#### Retorna um arrey de objeto

```json
[
	{
		"id": 1,
		"title": "Doutor Estranho no Multiverso da Loucura",
		"description": "Em Doutor Estranho no Multiverso da Loucura, após derrotar Dormammu e enfrentar Thanos nos eventos de Vingadores: Ultimato, o Mago Supremo, Stephen Strange (Benedict Cumberbatch), e seu parceiro Wong (Benedict Wong), continuam suas pesquisas sobre a Joia do Tempo. Mas um velho amigo que virou inimigo coloca um ponto final nos seus planos e faz com que Strange desencadeie um mal indescritível, o obrigando a enfrentar uma nova e poderosa ameaça.",
		"rating": 5,
		"user_id": 1,
		"created_at": "2022-07-04 17:33:54",
		"updated_at": "2022-07-04 17:33:54",
		"tags": [
			{
				"id": 1,
				"name": "Ação",
				"note_id": 1,
				"user_id": 1
			},
			{
				"id": 2,
				"name": "Aventura",
				"note_id": 1,
				"user_id": 1
			},
			{
				"id": 3,
				"name": "Fantasia",
				"note_id": 1,
				"user_id": 1
			}
		]
	}
]
```

## Rotas de Tags

### Atualizar uma Tag

```http
  PUT /api/note-tags/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id.params` | `string` | **Obrigatório**. ID da tag. |
| `user_id.query` | `string` | **Obrigatório**. ID do usuário. |
| `name.body` | `string` | **Obrigatório**. Nome da tag. |



#### Retorna um objeto

```json
{
	"message": "Nome da Tag foi atualizado com sucesso!"
}
```
## 🛠 Habilidades desenvolvidas no projeto
Javascript, NodeJS, Knex, Express

