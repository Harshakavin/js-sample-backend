import * as mongoose from "mongoose";
import { ICourse } from "../interfaces/ICourse";
export interface ICourseModel extends ICourse, mongoose.Document { }
const courseSchema = new mongoose.Schema({
    courseId : { type: String, unique: true },
    name : String,
    description : String,
    units : [],
});
const Course = mongoose.model<ICourseModel>("Course", courseSchema);

export { Course };
