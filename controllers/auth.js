const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin.js")

// LOGIN
const login = async (req, res) => {
    try {
        console.log("MASUK LOGIC LOGIN");
        
        // waktu expired token
        const maxAge = 3 * 24 * 60 * 60
        // get data from frontend
        const {
            username,
            password
        } = req.body

        console.log("USERNAME : "+username);
        console.log("PASSWORD  : "+password);
        
        

        // let's search a user in database by an username
        const admin = await Admin.findOne({ username: username });
        console.log("Admin data from DB: ", admin);
        if (!admin)  {
            req.flash("message", "User doesn't Exist")
            console.log("GANEMU USER");
            
            return res.redirect("/auth/login")
        }

        console.log("SEBELUM HASH PASSWORD");
        
        // Check if password that sent in frontend is equal to hashed password in database
        const checkHashPassword = await bcrypt.compare(password, admin.password)
        if (!checkHashPassword) {
            req.flash("message", "Wrong password")
            console.log("GAGAL PASSWORD");

            return res.redirect("/auth/login")
        }

        console.log("SETELAH HASH PASSWORD");

        // Then we give the admin a password
        const token = jwt.sign({ id:admin._id }, process.env.JWT_SECRET, {
            expiresIn: maxAge
        })
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        console.log("SETELAH JWT TOKEN");

        delete admin.password
        console.log("YANG BERHASIL MSK SINI");
        
        res.redirect("/admin")
    } catch (err) {
        req.flash("message", err.message)
        console.log("MASUK SINI BRE GAGAL");

        res.redirect("/auth/login")
        
    }
}

module.exports = {
    login
}