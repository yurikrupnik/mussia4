import { Document, Model as MongooseModel } from "mongoose";
import express from "express";
import { create, find, list, removeOne, update } from "./methods";

function createApiBackend<T extends Document, U extends MongooseModel<T>>(url: string, Model: U) {
    const route = express.Router();
    route.get(url, list(Model)); // array

    route.get(`${url}/:id`, find(Model)); // object
    route.post(url, create(Model));

    route.put(url, update(Model));

    route.delete(`${url}/:id`, removeOne(Model)); // id

    return route;
}

export default createApiBackend;
