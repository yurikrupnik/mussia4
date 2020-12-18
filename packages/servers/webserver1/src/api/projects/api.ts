// import axios from "axios";
// import request from "../request";
import { url } from "./config";
import { ProjectDocument, ProjectFront } from "./model";
import createApis from "../createApi";
// import { formatData } from "../providersHelpers";

const api = createApis<ProjectDocument, ProjectFront>(url);

// api.get({}).then((r) => {
//     r.map((rr) => {
//         // rr.
//     });
// });

export default api;
