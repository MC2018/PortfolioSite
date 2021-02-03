const nodemailer = require("nodemailer");
const express = require("express");
const winston = require("winston"); require("winston-daily-rotate-file");
const dotenv = require("dotenv").config();
const app = express();
const req = require("request");

// Winston Setup
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: "logs/%DATE%.log",
            datePattern: "YYYY-MM-DD",
            utc: true
        })
    ],
    format: winston.format.combine(
        winston.format.label(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            return `${getFormattedDate(new Date(info.timestamp))} - [${info.level}]: ${info.message}`;
        })
    )
});


// Express Setup
const port = 3000;
app.listen(port, () => logger.info(`Listening at ${port}`));
app.use(express.static("public"));
app.use(express.json({
    limit: "50kb"
}));

// Email
const postThrottle = 5;
let contactTimestamp = new Date(0);
app.post("/contact", (request, response) => {
    let name = request.body.name;
    let contactEmail = request.body.contactEmail;
    let subject = `Portfolio Contact: ${request.body.subject}`;
    let body = `Name: ${name}\nContact Email: ${contactEmail}\n\n${request.body.body}`;

    if (new Date().getTime() - contactTimestamp < postThrottle) {
        response.end();
        return;
    }

    contactTimestamp = new Date();

    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: subject,
        text: body
    };

    try {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                logger.error(`Problem sending email: ${error}\n${JSON.stringify(request.body)}`);
                response.json(getFailureResponse("We had a problem forwarding your information."));
            } else {
                logger.info("Email sent: " + info.response);
                response.json(getSuccessResponse("Information successfully sent."));
            }
        });
    } catch (error) {
        logger.error("Problem sending email: " + error);
        response.json(getFailureResponse("An unexpected problem occurred."));
    }
});


// Response Shortcuts
function getSuccessResponse(parameters) {
    return {
        body: parameters,
        status: "success"
    };
}

function getFailureResponse(parameters) {
    return {
        body: parameters,
        status: "failure"
    };
}

// Helper Methods
function getFormattedDate(date) {
    var date = new Date(date);
    var month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
    var day = `${date.getUTCDate()}`.padStart(2, "0");
    var hour = `${date.getUTCHours()}`.padStart(2, "0");
    var min = `${date.getUTCMinutes()}`.padStart(2, "0");
    var sec = `${date.getUTCSeconds()}`.padStart(2, "0");
    var millis = `${date.getUTCMilliseconds()}`.padStart(3, "0");
    return `${date.getUTCFullYear()}-${month}-${day} ${hour}:${min}:${sec}.${millis}`;
}