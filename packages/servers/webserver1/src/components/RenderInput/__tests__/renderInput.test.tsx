import React from "react";
import { Formik } from "formik"; // FormikProps, InjectedFormikProps, FieldPr
import { render, cleanup } from "@testing-library/react";

import RenderInput from "../index";

const { it, afterEach } = global;

afterEach(cleanup);

// const s: FieldProps = { field: {} };

// const onBlur = jest.fn(() => {});
// const onChange = jest.fn(() => {});

interface Dropwdown {
    _id: string;
    name: string;
}

interface Props {
    type?: "text" | "checkbox" | "radio" | "select";
    options?: Dropwdown[];
}

const Sr: React.FC<Props> = (props) => {
    const { type = "text", options } = props;
    // const [field, meta, helpers] = useField("aris");
    // const form = useFormikContext();
    // console.log("form", form);
    return (
        <Formik onSubmit={jest.fn()} initialValues={{ name: "" }}>
            <RenderInput name="name" options={options} type={type} label="label" />
        </Formik>
    );
};

it("should render RenderInput component", () => {
    render(<Sr />);
});

it("should render RenderInput component with checkbox", () => {
    render(<Sr type="checkbox" />);
});
//
it("should render RenderInput component with select", () => {
    render(<Sr type="select" options={[{ _id: "sd", name: "s" }]} />);
});
//
it("should render RenderInput component with radio", () => {
    render(<Sr type="radio" options={[{ _id: "sd", name: "s" }]} />);
});
