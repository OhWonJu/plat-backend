import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

export const generateSecret = () =>
  Math.random().toString(36).substr(2, 8).toUpperCase();

//mailgun을 이용한 메일 전송 함수
const sendMail = content => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const nodemailerMailgun = nodemailer.createTransport(mg(options));
  return nodemailerMailgun.sendMail(content);
};
// Mail의 몸통
export const sendSecretMail = (email, secret) => {
  const content = {
    from: "Zoody@plat.com",
    to: email,
    subject: "Secret Code For Plat🔑",
    html: `Hello! Your Secret Code is "<strong>${secret}</strong>". <br/>
            Copy Paste on the APP to Login!`,
  };
  return sendMail(content);
};
