import mongoose, { Schema, SchemaTypeOpts, Document, Model as Mo, SchemaTimestampsConfig } from "mongoose";
import { dbModel } from "./config";
import { MongoModel, SchemaFilter } from "../../types";

// type Users = im Pick<SchemaTimestampsConfig, SchemaFilter> {
//     email: string;
//     password: string;
//     token: string;
//     role: string;
//     image: string;
//
//     firstName: string;
//     lastName?: string;
//     fullName?: boolean;
//
//     isActive?: boolean;
//     creditCardNumber?: string;
// }

type ProjectFront = {
    name: string;
};

type Project = Pick<SchemaTimestampsConfig, SchemaFilter> & ProjectFront;

// interface User extends Pick<SchemaTimestampsConfig, SchemaFilter> {
//     email: string;
//     password: string;
//     token: string;
//     role: string;
//     image: string;
//
//     firstName: string;
//     lastName?: string;
//     fullName?: boolean;
//
//     isActive?: boolean;
//     creditCardNumber?: string;
// }

type ProjectDocument = Project & Document;
// interface UserDocument extends User, Document {}

const ProjectSchemaObj: Record<keyof Omit<Project, SchemaFilter>, SchemaTypeOpts<any>> = {
    name: {
        type: String,
        required: true,
    },
};

const ProjectSchema: Schema = new Schema(ProjectSchemaObj, {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
});

// UsersSchema.virtual("fullName").get(function (this: ProjectDocument) {
//     return `${this.firstName} ${this.lastName}`;
// });
//
// UsersSchema.methods.getFullname = function getFullname() {
//     return `${this.email}ar`;
// };
//
// UsersSchema.statics.findWithShit = function findWithShit(id: string) {
//     return this.findOne(id);
// };
// //
// async function preFindOneAndUpdates<T>(this: UpdateQuery<T>) {
//     if (this._update.password) {
//         this._update.password = await generateHash(this._update.password);
//     }
// }
//
// async function preSave(this: UserDocument, next: HookNextFunction) {
//     if (this.isModified("password")) {
//         this.password = await generateHash(this.password);
//     }
//     next();
// }

// UsersSchema.pre("findOne", function ad() {
//     console.log({this})
// });
// UsersSchema.pre("findOneAndUpdate", preFindOneAndUpdates);
// //
// UsersSchema.pre("save", preSave);

// type UserModels = <UserDocument, MongoModel<UserDocument>> {}
// interface ds extends UserDocument, MongoModel<UserDocument> {}
// type UserModel = Mo<UserDocument, MongoModel<UserDocument>>;
type ProjectModel = Mo<ProjectDocument, MongoModel<ProjectDocument>>;

const Model: ProjectModel = mongoose.model<ProjectDocument, MongoModel<ProjectDocument>>(dbModel, ProjectSchema);

const mock: Project[] = [
    {
        name: "project 1",
    },
    {
        name: "project 2",
    },
    {
        name: "project 3",
    },
    // {
    //     isActive: true,
    //     email: "a@a.com",
    //     token: "he",
    //     password: "rtl",
    //     role: "admin",
    //     image: "https://restcountries.eu/data/isr.svg",
    //     firstName: "aris 1",
    //     creditCardNumber: "8585 8585 8585 8588",
    // },
    // {
    //     isActive: true,
    //     email: "b@b.com",
    //     token: "he",
    //     password: "rtl",
    //     role: "admin",
    //     image: "https://restcountries.eu/data/isr.svg",
    //     firstName: "aris 1",
    // },
    // {
    //     isActive: true,
    //     email: "c@c.com",
    //     token: "he",
    //     password: "rtl",
    //     role: "admin",
    //     image: "https://restcountries.eu/data/isr.svg",
    //     firstName: "aris",
    // },
];

// Model.findOne({}).then((res) => {
//     console.log("res.fullName", res.fullName);
//     // res.find;
//     Model.findWithShit(res._id);
// });

Model.find({}).then(async (res) => {
    if (!res.length) {
        // const doc = await Model.create(mock[0]);
        // doc.createdAt; // 2020-07-06T20:36:59.414Z
        // doc.updatedAt; // 2020-07-06T20:36:59.414Z
        // Model.create({
        //     email: "s@s.com",
        //     password: "sd",
        //     firstName: "sd",
        //     lastName: "sd",
        //     token: "s",
        //     role: "s",
        //     image: "sd",
        //     // isActive: true,
        // });
        //     .then((r) => {
        //     // r.fullName;
        // });
        Model.insertMany(mock);
        // Model.create(mock[0]);
        // return Model.insertMany([
        //     {
        //         // primary: true,
        //         // // _id: "ds",
        //         // code: "ro",
        //         // name: " sd",
        //         // direction: "ds",
        //         // image: "ds",
        //     },
        // ]);
    }
    return false;
});

export default Model;

export { Project, ProjectDocument, ProjectModel, ProjectFront };
