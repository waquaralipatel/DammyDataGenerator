import mongoose from "mongoose"

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  salary: Number,
  language: String,
  city: String,
  isManager: Boolean,
});
export let Employees=mongoose.model('Employees',EmployeeSchema)