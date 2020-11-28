import React from "react";

// import PropTypes from 'prop-types';
import MuButton, { ButtonProps } from "@material-ui/core/Button";
// import styles from './';

interface Props extends ButtonProps {
    text?: string;
    // onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    data: [];
}

const Button: React.FC<Props> = (props) => {
    const { onClick, text = "aaa", classes } = props;
    return (
        <MuButton classes={classes} onClick={onClick}>
            {text}
        </MuButton>
    );
};

export default Button;
