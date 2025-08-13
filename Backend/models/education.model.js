import { Schema,model } from "mongoose"

const educationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    schoolName: String,
    startDate: Date,
    endDate: Date,
    degreeName: String,
    schoolLocation: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const Education = model('Education', educationSchema )
export default Education;