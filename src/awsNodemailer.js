const nodemailer = require("nodemailer");
const aws = require("aws-sdk");

const ses = new aws.SES();

const transporter = nodemailer.createTransport({ SES: ses });

module.exports = transporter;
