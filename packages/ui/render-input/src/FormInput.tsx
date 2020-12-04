import React, { useCallback } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import StyledRadio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useField } from "formik"; // FormikProps, InjectedFormikProps, FieldProps

const styles = { root: "" };

type options = Array<{ _id: string; name: string }>;

interface Props {
    name: string;
    disabled?: boolean;
    fullWidth?: boolean;
    multiline?: boolean;
    size?: "medium" | "small";
    type?: string;
    label?: string;
    // variant: string;
    rows?: number;
    // defaultValue: {};
    // styles: {};
    options?: options;
    onChange?: () => void;
    handleChangeCallback?: () => void;
    MenuOption?: React.ReactElement;
    endAdornment?: React.FC;
    startAdornment?: React.FC;
    defaultValue?: string;
    shit?: boolean;
    yuri?: boolean;
    yuri11?: boolean;
    yur1li?: boolean;
    // sds?: boolean;
    // shit6?: boolean;
    // shit62?: boolean;
    // ds?: boolean;
    // ds2?: boolean;
    // ds22?: boolean;
    // ds222?: boolean;
    // ae?: boolean;
    // yuri?: boolean;
    // field: {
    //     name: string;
    //     value: string | number | boolean;
    //     onChange: () => void;
    //     onBlur: () => void;
    // };
    // form: {
    //     errors: {};
    //     touched: boolean;
    // };
    // styles: {};
    variant?: "standard" | "filled" | "outlined";
    // SelectProps: {};
}

// interface FormValues {
//     email: string;
//     password: string;
// }

const FormInput: React.FC<Props> = (props) => {
    const {
        // shit = false,
        disabled = false,
        fullWidth = false,
        size = "medium",
        type = "text",
        // field,
        name,
        // form,
        label = "",
        multiline = false,
        rows = 0,
        variant = "standard",
        // options = [],
        // styles,
        defaultValue,
        // handleChangeCallback,
        // MenuOption = RTMenuItem,
        endAdornment = <span />,
        startAdornment = <span />,
        // SelectProps,
    } = props;

    console.log("yes prosps", props);
    const field = useField(name);
    // const form = useFormikContext();

    // console.log("field", field);
    // console.log("form", form);
    // console.log("props", props);
    // const { errors, touched } = form;
    const [{ value, onChange, onBlur }, { touched, error }] = field;
    const handleOnChange = useCallback((e) => {
        // console.log("evemt", e, checked);
        // console.log("a", a);
        onChange(e);
        // console.log("e, v", e, v);
        // handleChangeCallback(e, a);
    }, []);

    // const handleOnChange1 = useCallback((e, es) => {
    //     //     console.log("evemt", e, es);
    //     //     // console.log("a", a);
    //     onChange(e);
    //     //     // console.log("e, v", e, v);
    //     //     // handleChangeCallback(e, a);
    // }, []);
    if (type === "select") {
        return (
            <FormControl fullWidth={fullWidth} component="div">
                <TextField
                    className={styles.root}
                    size={size}
                    disabled={disabled}
                    variant={variant}
                    multiline={multiline}
                    rows={rows}
                    label={label}
                    // value={value}
                    name={name}
                    onChange={handleOnChange}
                    error={touched && !!error}
                    helperText={touched && error}
                    select
                    defaultValue={defaultValue}
                    // SelectProps={SelectProps}
                >
                    {[
                        {
                            name: "aris",
                            _id: "dsa",
                        },
                    ].map((v) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <MenuItem key={v._id} value={v._id}>
                            {v.name}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        );
    }
    if (type === "checkbox") {
        return (
            <FormControlLabel
                control={<Checkbox onChange={handleOnChange} name={name} value={value} />}
                label={label}
            />
        );
    }
    if (type === "radio") {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup
                    // disabled={disabled}
                    aria-label="position"
                    name="position"
                    value={value}
                    onChange={handleOnChange}
                    row
                >
                    {[
                        {
                            name: "aris",
                            _id: "dsa",
                        },
                    ].map((v) => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <FormControlLabel
                            name={name}
                            key={v._id}
                            value={v._id}
                            label={v.name}
                            // className={styles} removed label from control
                            control={<StyledRadio name={name} />}
                        >
                            {v.name}
                        </FormControlLabel>
                    ))}
                </RadioGroup>
            </FormControl>
        );
    }
    //
    // console.log("type", type);

    return (
        <FormControl fullWidth={fullWidth} component="div">
            <TextField
                size={size}
                disabled={disabled}
                type={type}
                variant={variant}
                multiline={multiline}
                rows={rows}
                label={label}
                value={value}
                name={name}
                defaultValue={defaultValue}
                onChange={handleOnChange}
                onBlur={onBlur}
                error={touched && !!error}
                helperText={touched && error}
                InputProps={{
                    startAdornment,
                    endAdornment,
                }}
            />
        </FormControl>
    );
};

export default FormInput;
