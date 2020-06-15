const db = require("../config/database");

// ==> Método responsável por criar um novo 'incident':
exports.createIncident = async (req, res) => {
  try {
    const dataInclusao = new Date().getDate().toString();
    const descricao = req.body.descricao;
    const idUsuario = req.body.id_usuario_inclusao;
    let id = 0;

    await db
      .query(
        'INSERT INTO "SGQ".incidente (descricao, id_usuario_inclusao, data_inclusao) VALUES ($1, $2, $3) RETURNING id',
        [descricao, idUsuario, dataInclusao]
      )
      .then((resp) => {
        id = resp.rows[0].id;
        req.body.incidenteInsumoNc.forEach((iinc) => {
          db.query(
            'INSERT INTO "SGQ".incidente_insumo (id_incidente, id_insumo) VALUES ($1, $2)',
            [id, iinc.id_insumo]
          ).then(res.status(201).send({id}));
        });
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// ==> Método responsável por listar todos os 'incident':
exports.listAllIncidents = async (req, res) => {
  const response = await db.query(
    'SELECT * FROM "SGQ".incidente ORDER BY descricao ASC'
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'incident' pelo 'Id':
exports.findIncident = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await db.query(
    'SELECT * FROM "SGQ".incidente WHERE id = $1',
    [id]
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'incident' pelo 'Id':
exports.updateIncident = async (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao, senha } = req.body;

  const response = await db.query(
    'UPDATE "SGQ".incidente SET descricao = $1, senha = $2 WHERE id = $3',
    [descricao, senha, id]
  );

  res.status(200).send({ message: "incident Updated Successfully!" });
};

// ==> Método responsável por excluir um 'incident' pelo 'Id':
exports.deleteIncident = async (req, res) => {
  const id = parseInt(req.params.id);
  await db.query('DELETE FROM "SGQ".incidente WHERE id = $1', [id]);

  res.status(200).send({ message: "incident deleted successfully!", id });
};
