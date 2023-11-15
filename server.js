const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
dotenv.config()

const widgetRouter = require("./routes/widget")
const authRouter = require("./routes/auth")

app.use(cors())
app.use("/widget", widgetRouter)
app.use("/auth", authRouter)

const db = require("./db/models")
const {
  user,
  feedback,
  dashboard,
  dashboardWidget,
  analysis,
} = require("./db/models")

db.sequelize.sync({ alter: true, force: false }).then(async (req) => {
  // dashboard.create({
  //   subscription: false,
  // })

  // await user.create({
  //   name: "John smithuser",
  //   dashboardId: 1,
  // })
  // await dashboardWidget.create({
  //   data: JSON.stringify({
  //     data: [
  //       {
  //         msg: "Vi på x AB värnar om våra kunder. feedback hjälper oss göra det ännu bättre!",
  //         type: "description",
  //       },
  //       {
  //         type: "dropdown",
  //         label: "Feedback category",
  //         options: ["Design", "Experience", "Products", "Other"],
  //         required: true,
  //       },
  //       {
  //         type: "textinput",
  //         label: "Name",
  //         required: false,
  //         placeholder: "Enter your name",
  //       },
  //       {
  //         type: "textarea",
  //         label: "Feedback",
  //         required: false,
  //       },
  //     ],
  //     buttonText: "Submit",
  //   }),
  //   dashboardId: 1,
  // })
  // await feedback.create({
  //   feedback: JSON.stringify({
  //     msg: "Dunder, galet,super, perfekt!",
  //     name: "Pontus Zetterberg",
  //   }),
  //   widgetId: b303f712-1b7c-4165-a054-b733be36c996,
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
