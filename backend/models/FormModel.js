import mongoose from "mongoose";

const FormLockSchema = new mongoose.Schema(
    {
        Email: { type: String },
        Name: { type: String },
        Subject: { type: String },
        Message: { type: String }
    },
    {collection: 'form'}
);

const FormLock = mongoose.model('Form', FormLockSchema);

export default FormLock;