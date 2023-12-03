module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("feedback", {
    feedback: {
      type: DataTypes.JSONB,
      validate: {
        notEmpty: true,
      },
    },
    widgetId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  })

  return Feedback
}
