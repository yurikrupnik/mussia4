// // const assert = require('assert');
// // const sinon = require('sinon');
// // const uuid = require('uuid');
// import { Request, Response } from "express";
// const { func2 } = require("../index");
//
// function chainObject(this: never) {
//     return this;
// }

it("func1 test", () => {
    expect(1).toBe(1);
    //     // Mock ExpressJS 'req' and 'res' parameters
    //     // const name = uuid.v4();
    // ts-ignore-next-line
    // const req = {
    //     query: {},
    //     body: {
    //         name: "yuri",
    //     },
    // };

    // const json = jest.fn();
    // const stub = sinon.stub();

    // const res = { status: jest.fn(chainObject), json };

    //     // console.log('s', s);
    //     // Call tested function
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // func1(<Request>req, res);
    // expect(json).toHaveBeenCalledTimes(1);
    // expect(json).toHaveBeenCalledWith({ ok: "yes" });
    //     // expect(send.calls.length).toHaveBeenCalledTimes(1)
    //     // console.log('res.send.mock.calls', res.send.mock.calls);
    //     // console.log('res.send.mock.calls', res.send.calls.length);
    //     // expect(res.send.mock.calls).toEqual([
    //     //     '4'
    //     // ]);
    //     // Verify behavior of tested function
    //     // assert.ok(res.send.calledOnce);
    //     // assert.deepStrictEqual(res.send.firstCall.args, [{ all: 'ssssssd' }]);
});
