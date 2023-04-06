// const nodemailer = require('nodemailer');

// const mailman = (data) => {
//     let mailTransporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 587, false for other ports
//         requireTLS: true,
//         auth : {
//             user: "SPU.Elisa@gmail.com",
//             pass: "svitawseyjrkqgav"
//         }
//     });

//     let content = {
//         from: "SPU.Elisa@gmail.com",
//         to: data,
//         subject : "Email Verification",
//         text : "Please click the link below to verify your email \n click this link"
//     }

//     mailTransporter.sendMail(content,(err)=>{
//         if (err)
//             console.log("error occured" + err);
//         else
//             console.log("success");
//     });
// }

// export default mailman;
