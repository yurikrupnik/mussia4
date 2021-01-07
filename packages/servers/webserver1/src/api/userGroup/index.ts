import { url as ul } from "./config";
import Model, { UserGroupDocument, UserGroupModel } from "./model";
import createBackedApi from "../createBackedApi";

export default createBackedApi<UserGroupDocument, UserGroupModel>(ul, Model);
