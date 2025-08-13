import { Schema, model } from "mongoose";

const experienceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobTitle: String,
    startDate: Date,
    endDate: Date,
    companyName: String,
    companyAddress: String,
    employmentType: String,

    createdAt: {
        type: Date,
        default: Date.now
   }
})

const Experience = model('Experience', experienceSchema)
export default Experience;