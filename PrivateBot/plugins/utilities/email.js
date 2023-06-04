const nodemailer = require("nodemailer");

exports.run = {

   usage: ['mailto'],

   hidden: ['mail'],
   use: 'name|email|subject|text',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'name|example@gmail.com|from alex|hello bro how are you?'), m)
         let str = text;

         str = str.replace(/\n/g, "<br>");
         let [mail1, mail2, mail3, mail4] = str.split`|`
         
         if (!mail1 || !mail2 || !mail3) return client.reply(m.chat, Func.texted('bold', `🚩 wrong format`), m)
         if (!mail1 || !mail2) return client.reply(m.chat, Func.texted('bold', `🚩 wrong format`), m)
         if (!mail1) return client.reply(m.chat, Func.texted('bold', `🚩 wrong format`), m)
         await kirim(mail1, mail2, mail3, mail4)
         await client.reply(m.chat, 'The email will be sent in a few seconds', m)
      } catch (e) {
         return client.reply(m.chat, '*Email Not Sent.*\n*Error*', m)
      }
   },
   error: false,
   premium: false,
   limit: true,
   cache: true,
   location: __filename
};

let kirim = async (email, mailto, subjek, text) => {
let smtpTransport = nodemailer.createTransport({

  service: 'SendinBlue',

  auth: {
    user: 'ikyybot13@gmail.com',
    pass: 'YxQ3TXp7wmHBWtV1',
  },
});
let url = "https://wa.me/6285894094841";
let domain = "https://wa.me/6285894094841";
let nama = email;
nama = nama.replace(/ |<br>/g, "_");
let user = email;
user = user.replace(/_|<br>/g, " ");
let to = subjek;
to = to.replace(/<br>/g, " ");
let tomail = mailto;
tomail = tomail.replace(/<br>| /g, "");
await smtpTransport.sendMail({
    from: nama +'@LORENZO-MD.whatsapp',
    to: tomail,
    subject: to,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }

      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }

      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }

      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        There is an email message sent by someone to you
      </div>

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="https://${domain}" target="_blank" style="display: inline-block;">
                    <img src="https://telegra.ph/file/0360dd842713a81d23b9b.png" alt="Logo" border="0" width="100" style="display: block; width: 100px; max-width: 100px; min-width: 100px;">
                  </a>
                </td>
              </tr>
            </table>

          </td>

        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">
                    ${text}</p>
                </td>
              </tr>

              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">LORENZO Bot By LORENZO,<br> ${domain}</p>
                </td>
              </tr>
    
            </table>

          </td>
        </tr>

        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">This email was sent by ${user} via whatsapp bot...</p>
                </td>
              </tr>
    
            </table>

          </td>
        </tr>
    
      </table>
    
    </body>
    </html>
`
  }, (error, info) => {
    if (error) {
      return m.reply(`*[!] Warning SMTP error, Limits run out*`)
    }
  });

  };