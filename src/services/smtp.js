const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "brunocpejr@gmail.com",
        pass: "bruno2022"
    }
});

console.log(transporter)
module.exports = transporter;