// import axiosMock from "axios";
import { renderHook, cleanup, act } from "@testing-library/react-hooks";
import React from "react";
import MockAdapter from "axios-mock-adapter";
import useUsers from "../index";
import request from "../../../api/request";
import { Provider } from "../../../api/users/context";
// import { screen, waitFor } from "@testing-library/react";
const mock = new MockAdapter(request);
afterEach(cleanup);
// import '../../../api/request'
// jest.mock("../../../api/request");
mock.onGet("/users", { params: {} }).reply(200, [{ _id: 1, name: "John Smith" }]);
mock.onPost("/users", {}).reply(200, [{ _id: "2", name: "aris" }]);
describe(useUsers.name, () => {
    test("default", async () => {
        // request.get.mockImplementationOnce(() => {
        //     return Promise.resolve({
        //         data: [],
        //     });
        // });
        // request.post.mockImplementationOnce(() => {
        //     return Promise.resolve({
        //         data: {
        //             name: "aris",
        //             email: "demo1@demo.com",
        //         },
        //     });
        // });
        // request.delete.mockImplementationOnce(() => {
        //     return Promise.resolve({
        //         data: {
        //             name: "aris",
        //             email: "demo1@demo.com",
        //         },
        //     });
        // });
        // request.put.mockImplementationOnce(() => {
        //     return Promise.resolve({
        //         data: {
        //             name: "aris",
        //             email: "demo1@demo.com",
        //         },
        //     });
        // });
        // rerender();
        // console.log("result", result.current);
        //
        // // expect(typeof result.current.bool).toBe("boolean");
        // // expect(result.current.bool).toBe(false);
        // let s;
        // const { result, waitForNextUpdate } = renderHook(() => useUsers(), {
        //     // eslint-disable-next-line react/display-name
        //     wrapper: ({ children }) => <Provider>{children}</Provider>,
        // });
        act(() => {
            renderHook(() => useUsers(), {
                // eslint-disable-next-line react/display-name
                wrapper: ({ children }) => <Provider>{children}</Provider>,
            });
        });
        // console.log("result", result.current);
        // await waitForNextUpdate();
        // console.log("result", result.current);
        // act(async () => {
        //     await result.current.post({
        //         name: "slo",
        //         email: "test@test.com",
        //         // password: 'aris'
        //     });
        // });
        // console.log("result.current", result.current);
        // await waitFor(() => expect(screen.getAllByText("Edit").length).toBe(1));
        // await waitForNextUpdate();
        // await waitForNextUpdate();
        // console.log("data", data);
        // wait(() => {
        //     console.log("result", result.current);
        // });
        // act(() => {
        //     result.current.add({
        //         role: "admin",
        //         hashPassword: "123456",
        //         name: "aris",
        //         email: "demo@demo.com",
        //     });
        // });
        // rerender();
        // act(() => {
        //     result.current.put({
        //         role: "admin",
        //         hashPassword: "123456",
        //         name: "aris",
        //         email: "demo@demo.com",
        //     });
        // });
        // rerender();
        // act(() => {
        //     result.current.remove("12");
        // });
        // rerender();
        // rerender();
        // expect(result.current.bool).toBe(true);
    });
    // test("init value", () => {
    //     const { result } = renderHook(() => useToggle(true));
    //     expect(result.current.bool).toBe(true);
    // });
    // test("override bool", () => {
    //     const { result } = renderHook(() => useToggle(true));
    //     act(() => {
    //         result.current.toggleBool(true);
    //     });
    //     expect(result.current.bool).toBe(true);
    // });
});
