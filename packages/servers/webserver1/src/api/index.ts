import express from "express";
import auth from "./auth";

import users from "./users";
import projects from "./projects";
import userGroup from "./userGroup";
import promotions from "./promotions";
import stoage from "./storage";

const route = express.Router();

route.use("/api", [auth, users, projects, userGroup, promotions, stoage]);

export default route;
