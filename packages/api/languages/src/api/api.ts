import { url } from "./config";
import createApis from "../services/createApi";
import { Language } from "./model";

const api = createApis<Language>(url);

export default api;
