const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv =  require("dotenv")
const ejs = require("ejs")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")

// Import Routes
const authRoutes = require("./routes/auth.js")

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
        const conn = await mongoose.connect('mongodb+srv://'+ process.env.DB_USERNAME +':'+ process.env.DB_PASSWORD +'@cluster0.wfjguv9.mongodb.net/',
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
    app.listen(PORT, function() {
        console.log("Server berjalan di port "+PORT);
    })
})

// User page
app.get("/", (req, res) => {
    res.render("home")
})

// Admin page
app.get("/admin", (req, res) => {
    res.render("admin")
})

app.use("/auth", authRoutes)