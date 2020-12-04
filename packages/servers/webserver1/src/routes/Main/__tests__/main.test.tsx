import React from "react";
import { render, cleanup } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import Component from "../index";
import { Provider } from "../../../api/users/context";
import request from "../../../api/request";

const mock = new MockAdapter(request);
afterEach(cleanup);
// import '../../../api/request'
// jest.mock("../../../api/request");
mock.onGet("/users", { params: {} }).reply(200, [
    { _id: "13", name: "John Smith" },
    { _id: "12", name: "Aris" },
]);
mock.onPost("/users", { name: "aris" }).reply(200, [{ _id: "2", name: "aris" }]);
afterEach(cleanup);

it(`should render ${Component.name} component`, async () => {
    // const { getByText, queryByTestId, waitFor, container } = render(
    //     <Provider>
    //         <Component />
    //     </Provider>
    // );
    render(
        <Provider>
            <Component />
        </Provider>
    );
    // await waitFor(() => expect(screen.getAllByText("Edit").length).toBe(2));
    // const firstEditButton = screen.findAllByText("Edit");
    // console.log("firstEditButton", firstEditButton);
    // fireEvent.click(firstEditButton, {
    //     target: { value: "chuck" },
    // });
    // let getByText;
    // let container;
    // let waitFor;
    // act(() => {
    //     const s = render(
    //         <Provider>
    //             <Component />
    //         </Provider>
    //     );
    //     container = s.container;
    //     waitFor = s.waitFor;
    //     getByText = s.getByText;
    // });
    // console.log("container", container);
    // waitFor();
    // waitFor(() => getByText(container, "aris"));
    // act(() => {
    //     // const { getByText, container } = render(
    //     //     <Provider>
    //     //         <Component />
    //     //     </Provider>
    //     // );
    // });
    // console.log("container", container);
    // const s = getByText("aris");
    // console.log("s", s);
    // console.log("container", container);
});
