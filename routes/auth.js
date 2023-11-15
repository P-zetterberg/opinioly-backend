const express = require("express")
const router = express.Router()
const { createClient } = require("@supabase/supabase-js")
const { user, dashboard } = require("../db/models")

const supabaseUrl = "https://foebhsyjevotvveomyop.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZWJoc3lqZXZvdHZ2ZW9teW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNzA2ODYsImV4cCI6MjAxMjk0NjY4Nn0.scxVcnN2Q1Gx2cK38o-zn4sdUAy21Z63pRwaphbVLO0"
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
    const { email, password, firstname, lastname } = req.body
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
            firstname: firstname,
            lastname: lastname,
            dashboardId: id,
            id: data.user.id,
          })
        })
    }
    res.status(status).send(resData)
  }
  signUpNewUser()
})

module.exports = router
