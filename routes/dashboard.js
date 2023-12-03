const express = require("express")
const router = express.Router()
const { dashboardWidget, feedback } = require("../db/models")

router.post("/widget-create", async (req, res) => {
  try {
    await dashboardWidget.create({
      data: req.body.data,
      dashboardId: req.body.dashboardId,
      name: req.body.name,
    })
    res.status(201).json({ message: "Resource created successfully" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
})
router.get("/list-widgets", async (req, res) => {
  let { dashboardId } = req.query
  try {
    const data = await dashboardWidget.findAll({
      where: {
        dashboardId: dashboardId,
      },
    })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
})
module.exports = router
