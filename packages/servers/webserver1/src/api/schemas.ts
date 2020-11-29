import { Schema } from 'mongoose';

const cssSchema = new Schema({
    option: {
        type: String,
        required: true
        // enum: [''] //all css options
    },
    value: {
        type: String,
        required: true
    },
    selector: {
        type: String,
        required: true,
        default: 'root'
    },
    permission: {
        type: Boolean,
        default: true
    }
});

const propsSchema = new Schema({
    option: {
        type: String
        // required: true
        // enum: [''] //all css options
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    selector: {
        type: String,
        required: true,
        default: 'title'
    },
    isStyle: {
        type: Boolean,
        default: false
    },
    permission: {
        type: Boolean,
        default: true
    }
});

const mobileSchema = {
    country_code: String,
    number: String
};

export { cssSchema, propsSchema, mobileSchema };
