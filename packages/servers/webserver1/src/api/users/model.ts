import mongoose, { Schema, SchemaTypeOpts, Document, Model as Mo, SchemaTimestampsConfig } from "mongoose";
import { dbModel, usersRoles } from "./config";
import { validateEmail } from "../../utils/validation";
import { MongoModel, SchemaFilter } from "../../types";
import { generateHashSync } from "../../services/passport/crypt";

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

type UserFront = {
    email: string;
    password: string;
    token: string;
    role: string;
    image: string;

    firstName: string;
    lastName?: string;
    fullName?: boolean;

    isActive?: boolean;
    creditCardNumber?: string;
};

type User = Pick<SchemaTimestampsConfig, SchemaFilter> & UserFront;

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

type UserDocument = User & Document;
// interface UserDocument extends User, Document {}

const userSchemaObj: Record<keyof Omit<User, SchemaFilter | "fullName">, SchemaTypeOpts<any>> = {
    creditCardNumber: {
        type: String,
        transform: (str) => {
            if (str) {
                return `****-****-****-${str.substr(str.length - 4)}`;
            }
            return null;
        },
        // get: (str: string) => {
        //     if (str) {
        //         return `****-****-****-${str.substr(str.length - 4)}`;
        //     }
        //     return null;
        // },
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
        validate: [validateEmail, "Please fill a valid email address"],
        // match: [emailReg, "pls"],
        // match: emailReg,
        index: true,
    },
    token: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        set: generateHashSync,
    },
    role: {
        type: String,
        enum: usersRoles,
        default: "admin",
    },
    image: {
        type: String,
        default: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
};

const UsersSchema: Schema = new Schema(userSchemaObj, { timestamps: true, toJSON: { virtuals: true, getters: true } });

UsersSchema.virtual("fullName").get(function (this: UserDocument) {
    return `${this.firstName} ${this.lastName}`;
});

UsersSchema.methods.getFullname = function getFullname() {
    return `${this.email}ar`;
};

UsersSchema.statics.findWithShit = function findWithShit(id: string) {
    return this.findOne(id);
};
//
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
type UserModel = Mo<UserDocument, MongoModel<UserDocument>>;

const Model: UserModel = mongoose.model<UserDocument, MongoModel<UserDocument>>(dbModel, UsersSchema);

const mock: User[] = [
    {
        isActive: true,
        email: "a@a.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris 1",
        creditCardNumber: "8585 8585 8585 8588",
    },
    {
        isActive: true,
        email: "b@b.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris 1",
    },
    {
        isActive: true,
        email: "c@c.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris",
    },
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

export { User, UserDocument, UserModel, UserFront };
