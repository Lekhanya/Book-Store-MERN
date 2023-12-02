import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
}
)

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

export const User = mongoose.model("User", userSchema)