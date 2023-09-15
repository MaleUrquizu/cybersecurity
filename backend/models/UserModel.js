import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            unique: true
        },
        lastName:{
            type: String,
            unique: true
        },
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            unique: true
        },
        roles: [
            {
                ref: "Role",
                defaut: "user",
                type: Schema.Types.ObjectId
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    },
    {collection: 'user'}
);

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

const User = mongoose.model('User', UserSchema);

export default User;