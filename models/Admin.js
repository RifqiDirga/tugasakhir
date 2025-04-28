const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
    }, { timestamps: true }
)


const Admin = mongoose.model("Admin", AdminSchema, "admin")
module.exports = Admin