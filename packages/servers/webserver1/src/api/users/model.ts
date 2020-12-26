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
    id?: string;
    lastName?: string;
    fullName?: boolean;

    isActive?: boolean;
    creditCardNumber?: string;
    provider: "local" | "google";
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
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    id: {
        type: String,
        required() {
            return this.provider !== "local";
        },
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
        required() {
            return this.provider === "local";
        },
        // required: true,
        // required: function() [{ return this.a === 'test'; }, 'YOUR CUSTOME MSG HERE']
        set: generateHashSync,
    },
    role: {
        type: String,
        enum: usersRoles,
        default: "admin",
    },
    image: {
        type: String,
        default: "",
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
        provider: "local",
    },
    {
        isActive: true,
        email: "b@b.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris 1",
        provider: "local",
    },
    {
        isActive: true,
        email: "c@c.com",
        token: "he",
        password: "rtl",
        role: "admin",
        image: "https://restcountries.eu/data/isr.svg",
        firstName: "aris",
        provider: "local",
    },
];

// Model.findOne({}).then((res) => {
//     console.log("res.fullName", res.fullName);
//     // res.find;
//     Model.findWithShit(res._id);
// });

export default Model;

export { User, UserDocument, UserModel, UserFront, mock };
