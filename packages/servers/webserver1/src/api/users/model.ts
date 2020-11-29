import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import faker from "faker";
// import times from "lodash/times";
import { createFake } from "../../services/db/fake";
import { dbModel } from "./config";
// import OnboardingModel from '../onboarding/model';
// import ProjectsModel from '../projects/model';
import { validateEmail, emailReg } from "../../utils/validation";
import { IUser } from "../../types";
// import { Mode } from "fs";

const UsersSchema: Schema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            // unique: true,
            required: "Email address is required",
            validate: [validateEmail, "Please fill a valid email address"],
            match: [emailReg, "Please fill a valid email address"],
            index: true,
        },
        token: {
            type: String,
            default: "",
        },
        hashPassword: {
            type: String,
            required: true,
        },
        // isMaster: {
        //     type: Boolean,
        //
        // },
        // name: String,
        // name: {
        // firstName: String,
        // lastName: String,
        name: String,
        // },
        projectKey: {
            type: String,
            default: "default",
            required: false,
            index: true,
        },
        // createdDate: {
        //     type: Date,
        //     default: Date.now,
        // },
        userAgent: String,
        role: {
            type: String,
            enum: ["agent", "editor", "designer", "admin"],
            default: "admin",
        },
        // ip: String,
        // avatar: String,
        // domainName: String,
        // domainWord: String,
        // domainSuffix: String,
        // ipv6: String,
        // userAgent: String,
        // mac: String,
    },
    { timestamps: true }
);

// interface usersModel extends IUser, Document {}
// type usersModelStatic = Model<usersModel>;

const Model = mongoose.model<IUser & Document>(dbModel, UsersSchema);
// new Model({});

// const len = Array.from(10);
// const len = new Array(10);
// new Model({})
Model.find().then((res) => {
    if (!res.length) {
        Model.insertMany(
            createFake(10, () => {
                // const mo = new Model({});
                return {
                    email: faker.internet.email(),
                    name: faker.internet.userName(),
                    hashPassword: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
                    // ip: faker.internet.ip(),
                    // avatar: faker.internet.avatar(),
                    // domainName: faker.internet.domainName(),
                    // domainWord: faker.internet.domainWord(),
                    // domainSuffix: faker.internet.domainSuffix(),
                    // ipv6: faker.internet.ipv6(),
                    // userAgent: faker.internet.userAgent(),
                    // mac: faker.internet.mac(),
                };
            })
        );
    }
});
export default Model;
