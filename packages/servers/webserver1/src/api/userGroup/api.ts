import { url } from "./config";
import { UserGroupDocument, UserGroupFront } from "./model";
import createApis from "../createApi";

const api = createApis<UserGroupDocument, UserGroupFront>(url);

export default api;
