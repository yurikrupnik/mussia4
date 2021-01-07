import { url as ul } from "./config";
import Model, { PromotionDocument, PromotionsModel } from "./model";
import createBackedApi from "../createBackedApi";

export default createBackedApi<PromotionDocument, PromotionsModel>(ul, Model);
