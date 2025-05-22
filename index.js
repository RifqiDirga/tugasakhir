const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv =  require("dotenv")
const ejs = require("ejs")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

// Import verifyToken
const verifyToken = require("./middleware/auth.js")

// Import Routes
const authRoutes = require("./routes/auth.js")              
// const composeRoutes = require("./routes/compose.js")
// configuration
const app = express()
dotenv.config()
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 60000 },
    saveUninitialized: false,
    resave: false
}))
app.use(flash())

// MongoDB Setup
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://'+ process.env.DB_USERNAME +':'+ process.env.DB_PASSWORD +'@cluster0.wfjguv9.mongodb.net/tugasakhirDB',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log("Database Connected "+conn.connection.host);
    } catch (err) {
        console.log(err);
        
    }
}

const PORT = process.env.PORT
connectDatabase().then(() => {
    app.listen(PORT, '0.0.0.0', function() {
        console.log("Server berjalan di port "+PORT);
    })
})


// User page
app.get("/", (req, res) => {
    res.render("user")
})

// User page
app.get("/bio", (req, res) => {
    res.render("bio")
})

// User page
app.get("/album", (req, res) => {
    res.render("album")
})

// Admin page
app.get("/admin", verifyToken, (req, res) => {
    res.render("admin")
})



app.use("/auth", authRoutes)
// app.use("/compose", composeRoutes)
app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { masAge: 1 })
    res.redirect("/auth/login")
})