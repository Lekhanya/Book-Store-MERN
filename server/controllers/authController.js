import { User } from "../models/userModel.js";
import createSecretToken from "../secretToken.js"

const signup = async (req, res, next) => {
    try{
        const { username, email, password } = req.body
        const existingUser = await User.findOne({email})
        if(existingUser) {
            res.send({ message: "User already exists" })
        }
        const user = await User.create({ 
            username, email, password
        })
        const token = createSecretToken(user._id)
        res.cookie("token", token, {
            withCredentials: true,
            httponly: false
        })
        res.status(201).json({
            message: "User signed in successfully", 
            success: true,
            user
        })
        next()
    } catch (err) {
        console.log(err)
        res.status(401).send({ message: err.message })
    }
}

export default signup