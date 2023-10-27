const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const widgetRouter = require("./routes/widget")
app.use(cors())
app.use("/widget", widgetRouter)
const db = require("./db/models")
const { user, feedback, dashboard, widget, analysis } = require("./db/models")

db.sequelize.sync({ alter: true, force: false }).then(async (req) => {
  // dashboard.create({
  //   subscription: false,
  // })
  // await user.create({
  //   name: "John smithuser",
  //   dashboardId: 1,
  // })
  // await widget.create({
  //   data: JSON.stringify(
  //    [
  // { "type": "textarea" },
  //{ "type": "textinput" }
  //]
  //   }),
  //   dashboardId: 1,
  // })
  // await feedback.create({
  //   feedback: JSON.stringify({
  //     msg: "Dunder, galet,super, perfekt!",
  //     name: "Pontus Zetterberg",
  //   }),
  //   widgetId: 1,
  // })
  // await analysis.create({
  //   feedbackId: 1,
  //   mood: "Positive",
  //   result: JSON.stringify({
  //     data: "allt tyder på att kunden är super nöjd! 100 gubbe, chat gipppity!",
  //   }),
  // })
  async function updateUser() {
    await user
      .update(
        { name: "Pontus Zetterberg" },
        {
          where: {
            Id: "af22285e-4d6e-461f-9c29-fd676f676002",
          },
          returning: true,
          raw: true,
        }
      )
      .then((res) => {
        console.log(res)
      })
  }
  // updateUser()
  app.listen(3000)
})
