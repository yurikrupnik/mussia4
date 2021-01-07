import express from "express";
import auth from "./auth";

import users from "./users";
import projects from "./projects";
import userGroup from "./userGroup";
import promotions from "./promotions";

const route = express.Router();

route.use("/api", [auth, users, projects, userGroup, promotions]);

export default route;
