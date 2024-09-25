import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String
        // required: true,
        // unique: true
    },
    password:{
        type: String,
        required: true,
    },
    // realpassword:{
    //     type: String,
    //     required: true,
    // }
})

const Client = mongoose.model('Client',UserSchema);
export default Client;