// import axios from "axios";
// import request from "../request";
import { url } from "./config";
import { UserDocument, UserFront } from "./model";
import createApis from "../createApi";
// import { formatData } from "../providersHelpers";

const api = createApis<UserDocument, UserFront>(url);

// api.get({}).then((r) => {
//     r.map((rr) => {
//         // rr.
//     });
// });

export default api;
