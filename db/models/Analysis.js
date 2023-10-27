module.exports = (sequelize, DataTypes) => {
  const Analysis = sequelize.define("analysis", {
    result: {
      type: DataTypes.JSONB,
    },
    mood: {
      type: DataTypes.STRING,
    },
  })
  Analysis.associate = function (models) {
    Analysis.belongsTo(models.feedback, { foreignKey: "feedbackId" })
  }
  return Analysis
}
