import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    image: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: Number,
      required: true,
    },
    currentCompany: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    about:{
        type: String,
        required: true,
    },
  },
  { minimize: false }
); //to create empty object with mentor data

const mentorModel =  mongoose.models.mentor || mongoose.model("mentor", mentorSchema);


export default mentorModel;
