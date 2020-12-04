import React from "react";
import { render, cleanup } from "@testing-library/react";
import Component from "../index";

const { it, afterEach } = global;

afterEach(cleanup);

it(`should  component`, () => {
    expect(1).toBe(1);
    // render(<Component  />);
    render(
        <Component
            open
            handleClose={jest.fn()}
            handleConfirm={jest.fn()}
            selected={{ _id: "1" }}
            // handleConfirm={useCallback((e) => {
            //     console.log("e", e);
            // })}
        />
    );
    // const rightClick = { button: 2 };
    // const button = getByTestId("confirm-button");
    // fireEvent.click(button, rightClick);
});
