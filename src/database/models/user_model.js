import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import hashPassword from "../../http/middlewares/hash_password.js";

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        default: function() {
            return this.email;
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+/, "Por favor, insira um email válido"]
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', hashPassword);

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = model("User", userSchema);

export default User;

