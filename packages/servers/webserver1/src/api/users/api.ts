import { url } from "./config";
import { UserDocument, UserFront } from "./model";
import createApis from "../createApi";

const api = createApis<UserDocument, UserFront>(url);

export default api;
