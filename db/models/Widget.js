module.exports = (sequelize, DataTypes) => {
  const Widget = sequelize.define("widget", {
    data: {
      type: DataTypes.JSONB,
      validate: {
        notEmpty: true,
      },
    },
  })
  Widget.associate = function (models) {
    Widget.hasMany(models.feedback, { foreignKey: "widgetId" })
  }
  return Widget
}
