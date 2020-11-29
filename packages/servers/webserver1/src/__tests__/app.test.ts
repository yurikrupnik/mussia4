/**
 * @jest-environment node
 */

// import express from 'express';
// const supertest = require('supertest');
// const http = require('http');
// const koa = require('koa');
// const app = require('../app');
// import components from '../api/components';
// const components = require('../api/components');
// console.log('components', components);
// const testApp = express();

// const { describe, test } = global;
// const apptest = supertest(app);
// const com = supertest(components);
// jest.mock('express', () => {
//     return require('jest-express');
// });
// testApp.use(components);
// const com = supertest(testApp);
describe('server', () => {
    test('with no server', () => {
        expect(1).toBe(1);
    });
    // describe('Test the app path', () => {
    //     test('It should response the GET method', (done) => {
    //         // components.address = 6001;
    //         apptest.get('/').then((response) => {
    //             expect(response.statusCode).toBe(200);
    //             // expect(1).toBe(1);
    //         });
    //         return done();
    //     });
    // });
    // describe('Test the components path', () => {
    //     test('It should response the GET method', (done) => {
    //         // components.address = 6001;
    //         apptest.get('/report').then((response) => {
    //             expect(response.statusCode).toBe(200);
    //             // expect(1).toBe(1);
    //         });
    //         return done();
    //     });
    // });
    // describe('Test the components path', () => {
    //     test('It should response the GET method', (done) => {
    //         // components.address = 6001;
    //         apptest.get('/api/components').then((response) => {
    //             expect(response.statusCode).toBe(200);
    //             // expect(1).toBe(1);
    //         });
    //         return done();
    //     });
    // });
    // describe('Test the components path', () => {
    //     test('It should response the GET method', (done) => {
    //         // components.address = 6001;
    //         com.get('/').then((response) => {
    //             console.log('response', response);
    //             expect(response.statusCode).toBe(200);
    //             // expect(1).toBe(1);
    //         });
    //         return done();
    //     });
    // });
    // describe('Test the components path', () => {
    //     test('It should response the GET method', (done) => {
    //         // components.address = 6001;
    //         com.get('/api/components').then((response) => {
    //             expect(response.statusCode).toBe(200);
    //             // expect(1).toBe(1);
    //         });
    //         return done();
    //     });
    // });
});
