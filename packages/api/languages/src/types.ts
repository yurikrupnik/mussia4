// import { Dispatch, SetStateAction } from "react";
// import { AxiosError } from "axios";
// import { RouteProps } from "react-router-dom";
// import { SimplePaletteColorOptions, Theme as DefaultTheme } from "@material-ui/core";
// import { CommonColors, PaletteOptions } from "@material-ui/core/styles/createPalette";
// import { TypographyOptions } from "@material-ui/core/styles/createTypography";
import { Document, Model } from "mongoose";
// import every from "lodash/every";
// import { Localization } from "./api/localization/model";
// import { Palette } from "./api/palettes/model";
// import { Currency } from "./api/currencies/model";
// import { Language } from "./api/languages/model";

export interface MongoModel<T extends Document> extends Model<T> {
    [key: string]: unknown;
}

export type Api<T> = {
    name: string;
    getQuery: (key: string, params: Partial<T>) => Promise<T[]>;
    getByIdQuery: (key: string, id: string) => Promise<T>;
    get: (params?: Partial<T>) => Promise<T[]>;
    getById: (id: string) => Promise<T>;
    post: (body: Partial<T>) => Promise<T>;
    put: (body: Partial<T>) => Promise<T>;
    remove: (id: string) => Promise<string>;
};

export interface link {
    code?: string;
    name: string;
    url: string;
    target: string;
    type: string;
    productType?: string;
}

export type serviceType = "FLIGHT" | "HOTEL" | "CAR" | "PACKAGE" | "CREDIT" | "EVENT";
