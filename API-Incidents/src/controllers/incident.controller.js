const db = require('../config/database');

// ==> Método responsável por criar um novo 'incident':
exports.createIncident = async (req, res) => {
  try {
    const dataInclusao = new Date().getDate().toString();
    const dataIncidente = req.body.data_incidente;
    const descricao = req.body.descricao;
    const idUsuario = req.body.id_usuario_inclusao;
    let id = 0;

    await db
      .query(
        'INSERT INTO "SGQ".incidente (descricao, id_usuario_inclusao, data_inclusao, data_incidente) VALUES ($1, $2, $3, $4) RETURNING id',
        [descricao, idUsuario, dataInclusao, dataIncidente]
      )
      .then((resp) => {
        id = resp.rows[0].id;
        req.body.insumos.forEach((iinc) => {
          db.query(
            'INSERT INTO "SGQ".incidente_insumo (id_incidente, id_insumo) VALUES ($1, $2)',
            [id, iinc.id]
          );
          res.status(201).send({
            idIncidente: id,
            message: 'Incidente cadastrado com sucesso!',
          });
        });
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// ==> Método responsável por listar todos os 'incident':
exports.listAllIncidents = async (req, res) => {
  const response = await db.query('SELECT i.*, u.nome FROM "SGQ".incidente i inner join "SGQ".usuario u on (u.id = i.id_usuario_inclusao)');
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'incident' pelo 'Id':
exports.findIncident = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await db
    .query('SELECT * FROM "SGQ".incidente WHERE id = $1', [id])
    .then((resp) => {
      db.query(
        'SELECT im.* FROM "SGQ".incidente i ' +
          'inner join "SGQ".incidente_insumo ii on (ii.id_incidente = i.id) ' +
          'inner join "SGQ".insumo im on (im.id = ii.id_insumo) WHERE i.id = $1',
        [id]
      ).then((respParts) => {
        const result = resp.rows.map((item) => {
          item.insumos = respParts.rows;
          return item;
        });
        res.status(200).send(result[0]);
      });
    });
};

exports.findIncidentPartsNCs = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await db
    .query('SELECT * FROM "SGQ".incidente WHERE id = $1', [id])
    .then((resp) => {
      db.query(
        'select i.* from "SGQ".insumo i ' +
          'inner join "SGQ".incidente_insumo_nc iin on (iin.id_insumo = i.id) ' +
          'where iin.id_incidente = $1',
        [id]
      ).then((respParts) => {
        const result = resp.rows.map((item) => {
          item.insumos = respParts.rows;
          return item;
        });

        db.query(
          'select nc.* from "SGQ".nao_conformidade nc ' +
            'inner join "SGQ".incidente_insumo_nc iin on (iin.id_insumo = nc.id) ' +
            'where iin.id_incidente = $1',
          [id]
        ).then((respNCs) => {
          const result = resp.rows.map((item) => {
            item.ncs = respNCs.rows;
            return item;
          });
          res.status(200).send(result[0]);
        });
      });
    });
};

// ==> Método responsável por atualizar um 'incident' pelo 'Id':
exports.updateIncident = async (req, res) => {
  const id = parseInt(req.params.id);
  const dataAlteracao = new Date().getDate().toString();
  const dataIncidente = req.body.data_incidente;
  const descricao = req.body.descricao;
  const idUsuarioAlteracao = req.body.id_usuario_alteracao;

  const response = await db
    .query(
      'UPDATE "SGQ".incidente SET descricao = $1, data_incidente = $2, data_alteracao = $3, ' +
        'id_usuario_alteracao = $4 WHERE id = $5',
      [descricao, dataIncidente, dataAlteracao, idUsuarioAlteracao, id]
    )
    .then(
      db.query('DELETE FROM "SGQ".incidente_insumo WHERE id_incidente = $1', [
        id,
      ])
    )
    .then(() => {
      req.body.insumos.forEach((iinc) => {
        db.query(
          'INSERT INTO "SGQ".incidente_insumo (id_incidente, id_insumo) VALUES ($1, $2)',
          [id, iinc.id]
        );
      });
      res.status(200).send({
        idIncidente: id,
        message: 'Incidente alterado com sucesso!',
      });
    });
};

// ==> Método responsável por excluir um 'incident' pelo 'Id':
exports.deleteIncident = async (req, res) => {
  const id = parseInt(req.params.id);

  await db
    .query('DELETE FROM "SGQ".incidente_insumo WHERE id_incidente = $1', [id])
    .then(db.query('DELETE FROM "SGQ".incidente_insumo_nc WHERE id_incidente = $1', [id]))
    .then(db.query('DELETE FROM "SGQ".incidente WHERE id = $1', [id]));

  res.status(200).send({ message: 'incident deleted successfully!', id });
};
