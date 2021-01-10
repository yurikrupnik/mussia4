// exports.function = (req, res) => {
//     res.status(200).json({
//         message: 'ok'
//     });
// };
import { Response, Request } from "express";
// import button from '@krupnik/button';
// import axios from 'axios';
// import chalk from 'chalk';
// import mongoose from 'mongoose';
// import render from '@krupnik/render/dist/cjs/index';
// import morgan from 'morgan/index';

const func1 = (req: Request, res: Response) => {
    console.log("ok"); // eslint-disable-line
    res.send(`<!DOCTYPE html>
<head>
  <title>Saying Hello</title>
</head>
<body>
  Hello, <b>World!</b><br>
  Hello, <b>dev.to!</b><br>
</body>`);
    // res.status(200).json({ ok: "yes" });
    // const dbURL = 'mongodb://yuri:ludmila900@ds263876.mlab.com:63876/client-app-projects';
    // mongoose.connect(dbURL);
    //
    // mongoose.connection.on('connected', function(){
    //     console.log(connected('Mongoose default connection is open to ', dbURL));
    //     req.status(500).send('failsed');
    // });
    //
    // mongoose.connection.on('error', function(err){
    //     // console.log(error('Mongoose default connection has occured '+err+' error'));
    //     req.status(500).send('failsed');
    // });
    //
    // mongoose.connection.on('disconnected', function(){
    //     console.log(disconnected('Mongoose default connection is disconnected'));
    //     req.status(500).send('failsed');
    // });
    //
    // process.on('SIGINT', function(){
    //     mongoose.connection.close(function(){
    //         req.status(500).send('failsed');
    //         process.exit(0);
    //     });
    // });
};

const func3 = (req: Request, res: Response) => {
    res.status(200).json({
        ok: "yes",
    });
};

// exports.func1 = func1;
export { func1, func3 };

// function(req, res) => {
//     function: res.status(200).json({
//         message: 'ok'
//     })
// }
