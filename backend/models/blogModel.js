import mongoose, { mongo, Mongoose } from "mongoose"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body : {
        type: String,
        required: true,
    },
    coverImage : {
        type: String, 
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"mentor",
    },
}, {timestamps: true});

const blogModel = mongoose.models.blog ||  mongoose.model("blog", blogSchema);

export default blogModel;