module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("feedback", {
    feedback: {
      type: DataTypes.JSONB,
      validate: {
        notEmpty: true,
      },
    },
  })

  return Feedback
}
