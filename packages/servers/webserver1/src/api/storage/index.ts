import express from "express";
import axios from "axios";
// import { Model as Mode } from "mongoose";
// import { url } from "./config";
// import { Storage } from "@google-cloud/storage";
// import { google } from "googleapis";

// import Model from "./model";
// import { list } from "../methods";
//
// const { OAuth2 } = google.auth;

// const oauth2Client = new google.auth.OAuth2(
//     "552054097269-8dpq61pku540cl71mb9jtho3dag3sglk.apps.googleusercontent.com",
//     "JG5rjZqAZluroM6eZ2H254LR",
//     "/auth/google/callback"
//     // /oauthcallback?code={authorizationCode}
// );

// const gmail = google.gmail({ version: "v1", auth: oauth2Client });
// // generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = ["https://www.googleapis.com/auth/blogger", "https://www.googleapis.com/auth/calendar"];

// const url = oauth2Client.generateAuthUrl({
//     // 'online' (default) or 'offline' (gets refresh_token)
//     access_type: "offline",
//
//     // If you only need one scope you can pass it as a string
//     scope: scopes,
// });

// const calandear = google.calendar({version: '3', auth: });
// calandear.freebusy.query({
//
//     resource: {
//         timeMin: '',
//         timeMax: '',
//         timeZone: 'America/Denver',
//         items: []
//     }
// })
// GMail
// import { sendEmail } from "../../services/email";
// import { MongoModel } from "../../types";
// import { IUser } from "../../types";

// import { IUser } from "../../types";
// const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

// async function listBuckets() {
//     try {
//         const results = await storage.getBuckets();
//
//         const [buckets] = results;
//
//         console.log("Buckets:");
//         buckets.forEach((bucket) => {
//             console.log(bucket.name);
//         });
//     } catch (err) {
//         console.error("ERROR:", err);
//     }
// }
const route = express.Router();

// export type CustomRequest<T, U> = {
//     query: T;
//     body: U;
// };
// const storage = new Storage({ clientOptions: {} });

route.get("/gmail", (req, res) => {
    res.status(200).send("ok");
    // gmail.users.labels.list(
    //     {
    //         userId: "me",
    //     },
    //     (err, response) => {
    //         if (err) {
    //             console.log(`The API returned an error: ${err}`);
    //             res.status(500).json(err);
    //         }
    //         const { labels } = response.data;
    //         if (labels.length) {
    //             console.log("Labels:");
    //             labels.forEach((label) => {
    //                 console.log(`- ${label.name}`);
    //             });
    //         } else {
    //             console.log("No labels found.");
    //         }
    //         res.status(200).json(response.data);
    //     }
    // );
    // const ress = await gmail.users.watch({
    //     userId: "me",
    //     requestBody: {
    //         // Replace with `projects/${PROJECT_ID}/topics/${TOPIC_NAME}`
    //         topicName: `projects/el-gato/topics/gmail`,
    //     },
    // });
    // google.gmail().users({})
    // res.json({ aris: "da" });
    // storage.getBuckets({project: 'mussia4-299720', pageToken: 'ya29.a0AfH6SMB8Yat5wwhzrRgdlvDr-BV_mHZpZZhdVoUKRuo2eqU56RjBBAp1uZHmAEgDIGkAGx961rTeGZ9-C6gu6ywrmf3t_9cnzwTkGFd3ATDv7goxTQ5NnlMfcg-ONJ_On20NQDHlGWOFkEHmmru6ndDXpdwYfw1ggfF_JLNaYmSj'}).then((response) => {
    // storage
    //     .getBuckets({
    //         pageToken:
    //             "ya29.a0AfH6SMDKttZAprA9i1kQqtLJn1Er4ylGlCA-1Lybg7mkEXuJec1DmRo1hcUDzN5-v0Ff-ZITplctZ3gEW75-wzjtUGulryraF96XeQzUg1gxTWKK496lsc3UQZJ8bBr5WmW7RBzMYr6yKzUR1uk9f-IoIr2pI9g5JBSZvLteK-op",
    //     })
    //     .then((response) => {
    //         res.status(200).json({ aris: true });
    //     })
    //     .catch((err) => {
    //         // console.log('err', err)
    //         res.status(500).json(err);
    //     });
}); // array

route.get("/storage", (req, res) => {
    // res.json({ aris: "da" });
    // storage.getBuckets({project: 'mussia4-299720', pageToken: 'ya29.a0AfH6SMB8Yat5wwhzrRgdlvDr-BV_mHZpZZhdVoUKRuo2eqU56RjBBAp1uZHmAEgDIGkAGx961rTeGZ9-C6gu6ywrmf3t_9cnzwTkGFd3ATDv7goxTQ5NnlMfcg-ONJ_On20NQDHlGWOFkEHmmru6ndDXpdwYfw1ggfF_JLNaYmSj'}).then((response) => {
    axios
        // .get("https://us-central1-mussia4-299720.cloudfunctions.net/func1")
        .get("https://europe-west1-mussia4-299720.cloudfunctions.net/func1")
        // storage
        //     .getBuckets()
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((err) => {
            // console.log('err', err)
            res.status(500).json(err);
        });
}); // array

// route.get(`${url}/:id`, (req: Request, res: Response) => {
//     // Model.findById(req.params.id)
//     //     //     .then((item) => {
//     //     //     item.
//     //     // })
//     //     // Model.findOne({ _id: req.params.id })
//     //     //     // .populate("projects", "name")
//     //     .then((data) => {
//     //         // data.
//     //         // console.log({ data });
//     //         res.status(200).json(data);
//     //     })
//     //     .catch((err) => res.status(500).json(err));
// }); // object

export default route;
