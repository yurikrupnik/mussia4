import mongoose, { Schema, Document, Model as MongooseModel } from "mongoose";
import { dbModel } from "./config";
import { MongoModel } from "../../types";

type UserGroupFront = {
    name: string;
};

type UserGroup = UserGroupFront;

type UserGroupDocument = UserGroup & Document;

const userGroupSchemaObj: Record<keyof UserGroup, any> = {
    name: {
        type: String,
    },
};

const UsersSchema: Schema = new Schema(userGroupSchemaObj, { timestamps: true });

type UserGroupModel = MongooseModel<UserGroupDocument, MongoModel<UserGroupDocument>>;

const Model: UserGroupModel = mongoose.model<UserGroupDocument, MongoModel<UserGroupDocument>>(dbModel, UsersSchema);

const mock: UserGroup[] = [
    {
        name: "he",
    },
    {
        name: "hes",
    },
    {
        name: "asdd",
    },
];

export default Model;

export { UserGroup, UserGroupDocument, UserGroupModel, UserGroupFront, mock };
