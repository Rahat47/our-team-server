import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email address is required"],
        validate: [validator.isEmail, "Please Provide a valid Email address"],
        unique: [true, "Email address must be unique"],
        lowercase: true
    },

    image: String,

    role: {
        type: String,
        enum: ["member", "admin", "project manager", "moderator"],
        default: "member"
    },

    password: {
        type: String,
        required: [true, "A password is required to continue"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password."],
        validate: {
            //?This only works on Save & Create !!!
            validator: function (el) {
                return el === this.password
            },
            message: "Password and Confirm Password Does Not Match!!!"
        }
    },
})

const Users = mongoose.model("Users", userSchema)

export default Users