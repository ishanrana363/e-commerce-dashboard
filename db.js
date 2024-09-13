const mongoose = require('mongoose');
require("dotenv").config();
async function connectDB() {
    let db_port = process.env.DB_URL;
    await mongoose.connect(db_port);
    console.log(`--Database connect--`)

}


module.exports = connectDB