import React from "react";
// import PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Route } from 'react-router-dom';

// type RouteType = {
//   path: string;
//   component: React.ReactElement;
//   key: string;
//   exact: boolean;
//   fetchInitialData: Promise<any>;
// };

// interface EnumServ/*iceGetOrderBy {
//     [index: number]: { id: number; label: string; key: string | number};
// }*/

interface Props {
  routes?: [];
}

const Router: React.FC<Props> = ({ routes }) => {
  console.log("routes", routes);
  return <div>asd</div>;
};

// const Router:React.FC<Props> = ({routes}) => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     return (
//         <>
//             {routes.map((route) => <Route key={route.key} {...route} />)} {/* eslint-disable-line */}
//         </>
//     );
// };

// Router.propTypes = {
//
// };

export default Router;
