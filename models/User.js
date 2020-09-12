import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
        type: String,
        required: true,
        min: 6
    },

    email:{
        type: String,
        required: true,
        max: 255
    },

    password:{
        type: String,
        required: true,
        min: 6
    },

    date: {
        type: Date,
        default: Date.now()
    }

});

const User = mongoose.model('users', userSchema);
export default User;