const transporter = require("./awsNodemailer");

function generateMailContent(url) {
  let mailContent = `<p>There are new oglasnik ads found on this page: <a target='_blank' href='${
    url.url
  }'>Link</a></p>`;

  url.ads.forEach(ad => {
    const adInMail = `<h3>${ad.title}</h3><h4>${ad.info}</h4><img src='${
      ad.image
    }' /><h5>${ad.price}</h5><p>Ad created date: ${
      ad.createdDate
    }</p><p><a target='_blank' href='${ad.link}'>Link to this ad</a></p><hr />`;

    mailContent += adInMail;
  });

  return mailContent;
}

function sendEmailsWithNewAds(stateDifferences) {
  stateDifferences.forEach(user => {
    user.oglasnikURLs.forEach(url => {
      if (url.ads.length > 0) {
        const mailContent = generateMailContent(url);

        const mailOptions = {
          from: "domagoj.zganec1@gmail.com",
          subject: "New oglasnik ads found!",
          html: mailContent,
          to: user.email
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log("FAILED SENDING EMAIL", mailOptions);
            console.log("FAILED SENDING EMAIL ERROR", err);
          } else {
            console.log(
              "FOLLOWING EMAIL SENT SUCCESSFULLY:",
              mailOptions,
              "------INFO-------",
              info
            );
          }
        });
      }
    });
  });
}

module.exports = sendEmailsWithNewAds;
