import mongoose, { Schema, Document, Model as Mo } from "mongoose";
import { dbModel } from "./config";
import { MongoModel } from "../../types";
import UserGroupModel, { UserGroup, UserGroupDocument } from "../userGroup/model";

type PromotionsFront = {
    name: string;
    type: "Basic" | "Common" | "Epic";
    startDate: Date;
    endDate: Date;
    userGroup: UserGroupDocument["_id"] | UserGroup;
};

type Promotions = PromotionsFront;
type PromotionDocument = Promotions & Document;

const PromotionsSchemaObj: Record<keyof Promotions, any> = {
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Basic", "Common", "Epic"],
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    userGroup: {
        type: mongoose.Types.ObjectId,
        ref: UserGroupModel,
    },
};

const PromotionsSchema: Schema = new Schema(PromotionsSchemaObj);

type PromotionsModel = Mo<PromotionDocument, MongoModel<PromotionDocument>>;

const Model: PromotionsModel = mongoose.model<PromotionDocument, MongoModel<PromotionDocument>>(
    dbModel,
    PromotionsSchema
);

const mock: Partial<Promotions>[] = Array.from({ length: 10000 }).map(() => ({
    name: "aris",
    type: "Basic",
    startDate: new Date(),
    endDate: new Date(),
}));

export default Model;

export { Promotions, PromotionDocument, PromotionsModel, PromotionsFront, mock };
