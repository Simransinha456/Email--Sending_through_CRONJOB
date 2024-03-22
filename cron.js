import userModel from "./models/userModel.js";
import nodemailer from "nodemailer";
import cron from "node-cron";
import { config } from "./config/config.js";

const sendMailToAllUsers = async (emailObj) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: "node", // any name
    to: emailObj,
    subject: "Hello user!! This is regarding Cron test mail",
    html: "<h2>Cron testing mail done successfully.</h2>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail has been sent:-", info.response);
    }
  });
};

export const sendMailAllUser = () => {
  try {
    cron.schedule("*/30 * * * * *", async function () {
      // after every 30 sec you will get mail from sauravkumar001088@gmail.com
      // console.log("hii");
      var usersData = await userModel.find({});
      if (usersData.length > 0) {
        var emails = [];
        usersData.map((key) => {
          emails.push(key.email);
        });
        // console.log(emails);
        // sendMailToAllUsers(emails);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
export default {
  sendMailAllUser,
};
