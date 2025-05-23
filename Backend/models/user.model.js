import mongoose from "mongoose";
import bcrypt from 'bcryptjs'; // bcrypt ko bcryptjs se replace kiya

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        // minlength: [5, 'Username must be at least 5 characters long']
    },
    fullName: {
        type: String,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        // validate: {
        //     validator: function (value) {
        //         // Must be 8+ chars, at least 1 number, and 1 special character
        //         return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value);
        //     },
        //     message: 'Password must be at least 8 characters long and include a number and a special character.'
        // }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
},
    {
        timestamps: true
    });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10); // bcryptjs ka use ho raha hai
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // bcryptjs ka use ho raha hai
};

const User = mongoose.model("User", userSchema);
export default User;
