export const ROLES = ["user", "admin"];

import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);

const Role = mongoose.model('Role', RoleSchema);

export default Role;
