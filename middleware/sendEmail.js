const nodemailer = require('nodemailer')


const sendMail = function(type){
    return async (req, res, next) => {
        console.log(req.body)
        try{
            // Create Transport Object
            let transporter = await nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                requireTLS: true,
                secure: false, // true for 465, false for other ports        
                auth: {
                user: 'itsupport@digitellinc.com',
                pass: 'D1g173ll!'
                },
            });
            // New User Created Message
            if(type == "report"){
                // send mail with defined transport object
                let info = await transporter.sendMail({
                from: 'Multiviewer, <Mulitviewer>', // sender address
                to: "csampson@digitellinc.com", // list of receivers
                subject: "MulitViewer: User Reported Issue", // Subject line
                html: `
                <h2>Encoder Name: ${req.body.name}</h2>
                <h3>UserName: ${req.body.username}</h3>
                <h3>User Contact: ${req.body.email}</h3>
                <h3>Problem Reported: ${req.body.problem}</h3>
                <span>User Message: ${req.body.message}</span>
                `, // html body
                });
            }
            // Report Message
            else if(type == "new_user"){
                // send mail with defined transport object
                let info = await transporter.sendMail({
                from: 'Multiviewer, <Mulitviewer>', // sender address
                to: "csampson@digitellinc.com", // list of receivers
                subject: "MulitViewer: New Account Created", // Subject line
                html: `
                <h2>New Account: ${req.body.username}</h2>
                <h3>User Email: ${req.body.email}</h3>
                <h3>User Role: ${req.body.role}</h3>
                <span>Account Created by: ${req.currentUser}</span>
                `, // html body
                });
            }
            else if(type == "user_edit"){
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: 'Multiviewer, <Mulitviewer>', // sender address
                    to: "csampson@digitellinc.com", // list of receivers
                    subject: "MulitViewer: User Made Changes to Account", // Subject line
                    html: `
                    <h2>New Account: ${req.body.username}</h2>
                    <h3>User Email: ${req.body.email}</h3>
                    <h3>User Role: ${req.body.role}</h3>
                    <span>Account Created by: ${req.currentUser}</span>
                    `, // html body
                });
            }
            next()  
        }
        catch(err){
            res.status(err.status || 500)
            res.render('error', {error: err})
            next()
        }
    }
}

module.exports = sendMail;