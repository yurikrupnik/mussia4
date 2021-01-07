import { url } from "./config";
import { PromotionDocument, PromotionsFront } from "./model";
import createApis from "../createApi";

const api = createApis<PromotionDocument, PromotionsFront>(url);

export default api;
