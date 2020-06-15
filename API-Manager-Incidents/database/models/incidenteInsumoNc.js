
module.exports = (sequelize, DataTypes) => {
  const IncidenteInsumoNC = sequelize.define('IncidenteInsumoNC', {
    id_usuario_nc: DataTypes.INTEGER,
    id_incidente: DataTypes.INTEGER,
    id_insumo: DataTypes.INTEGER,
    id_nc: DataTypes.INTEGER,
    data_nc: DataTypes.STRING
  }, {
    schema: "SGQ",
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "incidente_insumo_nc",
  });
  IncidenteInsumoNC.associate = function(models) {
    // associations can be defined here
    IncidenteInsumoNC.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario_nc',
      as: 'Usuario'
    });
    
    IncidenteInsumoNC.belongsTo(models.Incidente, {
      foreignKey: 'id_incidente',
      as: 'Incidente'
    });
    
    IncidenteInsumoNC.belongsTo(models.Insumo, {
      foreignKey: 'id_insumo',
      as: 'Insumo'
    });

    IncidenteInsumoNC.belongsTo(models.NaoConformidade, {
      foreignKey: 'id_nc',
      as: 'NaoConformidade'
    });
  };
  return IncidenteInsumoNC;
};