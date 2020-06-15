
module.exports = (sequelize, DataTypes) => {
  const Insumo = sequelize.define('Insumo', {
    nome: DataTypes.TEXT,
    descricao: DataTypes.TEXT
  }, {
    schema: "SGQ",
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "insumo",
  });
  Insumo.associate = function(models) {
    // associations can be defined here
    
    Insumo.belongsToMany(models.Incidente, {
      through: models.IncidenteInsumoNC,
      foreignKey: 'id_insumo', // replaces `productId`
      otherKey: 'id_incidente' // replaces `categoryId`
    });

    // Insumo.belongsToMany(models.Incidente, {
    //   through:"incidente_insumo"
    // });

  };
  return Insumo;
};