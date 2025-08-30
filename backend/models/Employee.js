const mongoose = require("mongoose");

// Define employee schema
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields
);

// Create model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee; 