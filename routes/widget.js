const express = require("express")
const router = express.Router()
const { dashboardWidget, feedback } = require("../db/models")
router.use(express.static("public/widget"))
router.use(logger)

//Uses public id
router.get("/get", async (req, res) => {
  try {
    const data = await dashboardWidget.findOne({
      where: {
        public_id: req.query?.id,
      },
    })
    if (!data) throw "No data found."
    res.send(data)
  } catch (err) {
    res.status(404).send(err)
  }
})

//Uses public id
router.post("/feedback/new", async (req, res) => {
  try {
    await feedback.create({
      feedback: JSON.stringify(req.body.feedback),
      widgetId: req.body.widgetId,
    })
    res.status(201).json({ message: "Resource created successfully" })
  } catch (error) {
    console.log(error)
  }
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router
// try {
//   const data = await dashboardWidget.findOne({
//     where: {
//       id: "b303f712-1b7c-4165-a054-b733be36c996",
//     },
//     include: [
//       {
//         model: feedback,
//         attributes: ["feedback", "id"],
//       },
//     ],
//   })
//   if (!data) throw "No data found."
//   res.send(data)
// } catch (err) {
//   res.status(404).send(err)
// }
