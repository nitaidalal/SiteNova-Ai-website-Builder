import {Schema,model} from "mongoose";

const messageSchema = new Schema({
    role:{
        type:String,
        enum:["user","ai"],
        required:true
    },
    content:{
        type:String,
        required:true
     }
},{timestamps:true})

const websiteSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        default:"Untitled Website"
    },
    latestCode:{
        type:String,
        required:true
     },
     conversation:[messageSchema],  
     deployed:{
        type:Boolean,
        default:false
     },
     deployedUrl:{
        type:String,
     },
     slug:{
        type:String,
        required:true,
        unique:true
     }

},{timestamps:true});

const Website = model("Website",websiteSchema);

export default Website;
