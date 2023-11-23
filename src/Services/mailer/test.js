const nodemailer = require('nodemailer');


module.exports.sendTestEmail = function () {
    let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth : {
            user: "",
            pass: ""
        }
    });

    let content = {
        from: "",
        to: "",
        subject : "test nodemailer",
        text : "it is working"
    }

    mailTransporter.sendMail(content,(err)=>{
        if (err)
            console.log("error occured" + err);
        else
            console.log("success");
    });
}
