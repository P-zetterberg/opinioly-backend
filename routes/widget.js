const express = require("express")
const router = express.Router()
const { widget } = require("../db/models")

router.use(logger)

router.get("/get", async (req, res) => {
  try {
    const data = await widget.findOne({
      where: {
        id: req.query?.id,
      },
    })
    if (!data) throw "No data found."
    res.send(data)
  } catch (err) {
    res.status(404).send(err)
  }
})

router.post("/", (req, res) => {
  const isValid = false
  if (isValid) {
    users.push({ firstName: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log("Error")
    res.render("users/new", { firstName: req.body.firstName })
  }
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router
