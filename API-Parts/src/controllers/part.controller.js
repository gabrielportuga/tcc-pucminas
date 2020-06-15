const db = require("../config/database");

// ==> Método responsável por criar um novo 'part':
exports.createPart = async (req, res) => {
  const { nome, descricao } = req.body;
  const response = await db.query(
    'INSERT INTO "SGQ".insumo (nome, descricao) VALUES ($1, $2)',
    [nome, descricao]
  );

  res.status(201).send({
    message: "part added successfully!",
    body: {
      part: { nome, descricao },
    },
  });
};

// ==> Método responsável por listar todos os 'part':
exports.listAllParts = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM "SGQ".insumo ORDER BY nome ASC'
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'part' pelo 'Id':
exports.findPart = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM "SGQ".insumo WHERE id = $1', [
    id,
  ]);
  res.status(200).send(response.rows);
};

exports.findPartsLike = async (req, res) => {
  try {
    const nome = req.params.name;
    const query = `SELECT id, nome FROM "SGQ".insumo WHERE UPPER(nome) like UPPER('${nome}%')`
    const response = await db.query(
      query
    );
    res.status(200).send(response.rows);
  } catch (err) {
    res.status(500).send(err);
  }
};

// ==> Método responsável por atualizar um 'part' pelo 'Id':
exports.updatePart = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, descricao } = req.body;

  const response = await db.query(
    'UPDATE "SGQ".insumo SET nome = $1, descricao = $2 WHERE id = $3',
    [nome, descricao, id]
  );

  res.status(200).send({ message: "part Updated Successfully!" });
};

// ==> Método responsável por excluir um 'part' pelo 'Id':
exports.deletePart = async (req, res) => {
  const id = parseInt(req.params.id);
  await db.query('DELETE FROM "SGQ".insumo WHERE id = $1', [id]);

  res.status(200).send({ message: "part deleted successfully!", id });
};
