
module.exports = (sequelize, DataTypes) => {
  const NaoConformidade = sequelize.define('NaoConformidade', {
    nome: DataTypes.TEXT,
    descricao: DataTypes.TEXT
  }, {
    schema: "SGQ",
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "nao_conformidade",
  });
  NaoConformidade.associate = function(models) {
    // associations can be defined here
    
   
  };
  return NaoConformidade;
};