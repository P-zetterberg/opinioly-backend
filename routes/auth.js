const express = require("express")
const router = express.Router()
const { createClient } = require("@supabase/supabase-js")
const { user, dashboard } = require("../db/models")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

router.post("/login", async (req, res) => {
  async function signInWithEmail() {
    const { resData } = req.body
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: username,
    //   password: password,
    // })
    let status = resData?.user ? 200 : 401
    //let resData = status === 200 ? data : error
    res.status(status).send(resData)
  }
  signInWithEmail()
})

router.post("/register", async (req, res) => {
  async function signUpNewUser() {
    const { email, password } = req.body
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    let status = data?.user ? 200 : 500
    let resData = status === 200 ? data : error

    if (status === 200) {
      await dashboard
        .create({
          subscription: false,
        })
        .then(async (newRecord) => {
          let id = newRecord.id
          await user.create({
            dashboardId: id,
            id: data.user.id,
          })
        })
    }
    res.status(status).send(resData)
  }
  signUpNewUser()
})

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params
    if (id == "undefined") throw new Error("No id provided")
    const data = await user.findOne({
      where: {
        id: id,
      },
    })
    if (!data) throw "No data found."
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
