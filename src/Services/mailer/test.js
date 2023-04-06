const nodemailer = require('nodemailer');


module.exports.sendTestEmail = function () {
    let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth : {
            user: "SPU.Elisa@gmail.com",
            pass: "svitawseyjrkqgav"
        }
    });

    let content = {
        from: "SPU.Elisa@gmail.com",
        to: "samd@spu.edu",
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
