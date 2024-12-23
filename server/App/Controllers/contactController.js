const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "kansarapradyumn@gmail.com",
        pass: "ecdilpeawpgueqll",
    },
});

exports.saveForm = async (req, res) => {
    const info = await transporter.sendMail({
        from: `${req.body.cName} <${req.body.cEmail}>`, // sender address
        to: "kansarapradyumn@gmail.com", // list of receivers
        subject: "Enquiry", // Subject line
        text: `${req.body.cMessage} `, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    res.send({
        status: 1,
        msg_: "data send successfully"
    })
    // console.log(req.body)
}