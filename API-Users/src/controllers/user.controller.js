const db = require('../config/database');

// ==> Método responsável por criar um novo 'user':
exports.createUser = async (req, res) => {
  const { cpf, nome, senha } = req.body;
  const response = await db.query(
    'INSERT INTO "SGQ".usuario (cpf, nome, senha) VALUES ($1, $2, $3)',
    [cpf, nome, senha]
  );

  res.status(201).send({
    message: 'user added successfully!',
    body: {
      user: { nome, senha },
    },
  });
};

// ==> Método responsável por listar todos os 'user':
exports.listAllUsers = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM "SGQ".usuario ORDER BY nome ASC'
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'user' pelo 'Id':
exports.findUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM "SGQ".usuario WHERE id = $1', [
    id,
  ]);
  res.status(200).send(response.rows[0]);
};

// ==> Método responsável por atualizar um 'user' pelo 'Id':
exports.updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, senha } = req.body;

  const response = await db.query(
    'UPDATE "SGQ".usuario SET nome = $1, senha = $2 WHERE id = $3',
    [nome, senha, id]
  );

  res.status(200).send({ message: 'user Updated Successfully!' });
};

// ==> Método responsável por excluir um 'user' pelo 'Id':
exports.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  await db.query('DELETE FROM "SGQ".usuario WHERE id = $1', [id]);

  res.status(200).send({ message: 'user deleted successfully!', id });
};

// ==> Método responsável por verificar login e Senha 'user' pelo 'Id':
exports.validateUser = async (req, res) => {
  const { cpf, senha } = req.body;
  const response = await db.query(
    'SELECT id, cpf, nome FROM "SGQ".usuario WHERE cpf = $1 and senha = $2',
    [cpf, senha]
  );

  if (response.rows.length == 1) {
    res.status(200).send(response.rows[0]);
  } else {
    res.status(401).send({
      message: 'Usuário não autorizado!',
      valid: false,
    });
  }
};
