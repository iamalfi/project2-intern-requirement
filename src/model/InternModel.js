// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        required : true,

    },
    mobile : {
        type : Number,
        unique : true,
        required : true
    },
    collegeId :{
        type : ObjectId,
        ref : "college"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

module.exports = mongoose.model("intern",internSchema);

