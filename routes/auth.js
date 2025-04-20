const express = require("express")
const { login } = require("../controllers/auth.js")

const router = express.Router()
router.get("/login", (req, res) => {
    res.render("login", { message: req.flash("message") })
})
router.post("/login", login)

module.exports = router