import mongoose, { Schema, Document } from "mongoose";
import { dbModel } from "./config";
import { MongoModel } from "../types";

interface Language {
    // _id: string;
    name: string;
    code: string;
    direction: string;
    primary: boolean;
    image: string;
}

type LanguageDocument = Language & Document;

const languageSchemaObj: Record<keyof Omit<Language, "_id">, any> = {
    name: String,
    code: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        default: "ltr",
    },
    primary: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
};

const LanguagesSchema: Schema = new Schema(languageSchemaObj);

interface ProductTypeModel extends MongoModel<LanguageDocument> {
    findYoungerThan: Promise<any>;
}

LanguagesSchema.statics.findYoungerThan = function findYoungerThan(age: number) {
    console.log("age", age);
    // return age;
    // const minimumBirthDate = new Date(Date.now() - age * 365 * 24 * 3600 * 1000);
    return this.find({});
};

LanguagesSchema.statics.updateComponentByUrl = function (age: number) {
    console.log("age", age);
    // return age;
    // const minimumBirthDate = new Date(Date.now() - age * 365 * 24 * 3600 * 1000);
    return this.find();
};

const Model = mongoose.model<LanguageDocument, ProductTypeModel>(dbModel, LanguagesSchema);

// Model.findYoungerThan(2).then((r) => {
//     console.log({ r });
// });

const mock: Array<Language> = [
    {
        // _id: "s",
        name: "hebrew",
        code: "he",
        direction: "rtl",
        primary: false,
        image: "https://restcountries.eu/data/isr.svg",
    },
    {
        name: "english",
        code: "en",
        primary: false,
        direction: "ltr",
        image: "https://restcountries.eu/data/gbr.svg",
    },
    {
        name: "russian",
        code: "ru",
        direction: "ltr",
        primary: false,
        image: "https://restcountries.eu/data/rus.svg",
    },
];

// const item = new Model({});

export default Model;

// Model.find({}).then((res) => {
//     // console.log("res", res);
//     if (!res.length) {
//         // Model.create({ direction: "ds", code: "ds", primary: true, name: "a", image: "s" });
//         Model.insertMany(mock);
//         // Model.create(mock[0]);
//         // return Model.insertMany([
//         //     {
//         //         primary: true,
//         //         // _id: "ds",
//         //         code: "ro",
//         //         name: " sd",
//         //         direction: "ds",
//         //         image: "ds",
//         //     },
//         // ]);
//     }
// });

export { LanguagesSchema, mock, Language };
