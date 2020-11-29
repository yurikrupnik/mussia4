// import { ServerClient } from 'postmark';
// import { isProd } from '../../config';
//
// const serverToken = process.env.POSTMARK_API_KEY || 'a823c3b7-0815-4576-b5fe-f286e8aa21a9';
//
// const client = new ServerClient(serverToken);
//
// const systemEmailAddress = 'roundtrip@rndrobin.com';

/**
 * Sends an email.
 * @param subject{string} Email subject
 * @param body{string|object} Email body (can be plain text or HTML)
 * @param to{string|object} Email address to send the email to or object
 * {email: string, name: string}
 * @param isHTMLBody{boolean} Is the email body in HTML format?
 * @param callback{function} The callback function
 */

const lastEmails: [] = [];
const sendEmail = () => {
    // const emailSignature:string = `${from}_${subject}_${to}_${body.length}`;
    // if (lastEmails.indexOf(emailSignature) !== -1) {
    //     return;
    // }
    // lastEmails.push(emailSignature);
    // if (lastEmails.length > 10) {
    //     lastEmails.shift();
    // }
    // const env = !isProd ? 'DEV - ' : '';
    // const options = {
    //     From: from || systemEmailAddress,
    //     ReplyTo: from || systemEmailAddress,
    //     To: to || systemEmailAddress,
    //     Bcc: 'reservations@roundtrip.co.il', // clear copy archive
    //     Subject: env + subject
    // };
    // if (typeof body === 'object') {
    //     options.TextBody = body;
    // } else {
    //     options.HtmlBody = body;
    // }
    // client.sendEmail(options, callback);
    // if (process.env.DISABLE_EMAILS && process.env.DISABLE_EMAILS === 'true') {
    //     console.log('email sender blocked by DISABLE_EMAILS'); // eslint-disable-line
    //     callback(null, null);
    // } else {
    // }
};

export { sendEmail, lastEmails };
