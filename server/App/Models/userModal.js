const { Schema, default: mongoose } = require("mongoose");

let userSchema = new Schema({
    uFirstName: {
        type: String,
        required: true
    },
    uLastName: {
        type: String,
        required: true
    },
    uPhone: {
        type: String,
        default: null
        // required:true,
        // unique: true,  // Enforce uniqueness
        // match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
    },
    uPassword: {
        type: String,
        default: null,
        // required:true
    },
    uEmail: {
        type: String,
        required: true,
        // unique: true,  // Enforce uniqueness
        // match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'] // Regex for email validation
    },
})

let userModal = mongoose.model("users", userSchema)

module.exports = userModal;