const express = require("express")
const router = express.Router()
const { dashboardWidget, feedback } = require("../db/models")
const { Op } = require("sequelize")

router.post("/widget-create", async (req, res) => {
  const uniqueName = await dashboardWidget.findOne({
    where: {
      name: {
        [Op.iLike]: req.body.name,
      },
      dashboardId: req.body.dashboardId,
    },
  })
  if (!uniqueName) {
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
  } else {
    res.status(409).json({ message: "Name already exists" })
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
router.get("/list-feedback", async (req, res) => {
  let { dashboardId, name } = req.query
  try {
    const data = await dashboardWidget.findAll({
      attributes: ["id", "name"],
      where: {
        dashboardId: dashboardId,
        name: {
          [Op.iLike]: name,
        },
      },
      include: feedback,
    })

    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
})
module.exports = router
