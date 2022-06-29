const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "brunocpejr@gmail.com",
        pass: "acwtuwamgtceqxqh"
    }
});

module.exports = transporter;