import React from "react";
// import PropTypes from 'prop-types';

interface Props {
    providers: [];
    children: React.FC;
}

const Providers: React.FC<Props> = ({ children }) => <>{children}</>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const Providers: React.FC<Props> = ({ children, providers }): React.ReactElement =>
//     providers.reduceRight((acc, c) => React.createElement(c, {}, acc), children);

// Providers.propTypes = {
//     children: PropTypes.element.isRequired,
//     providers: PropTypes.arrayOf(PropTypes.func).isRequired
// };

export default Providers;
