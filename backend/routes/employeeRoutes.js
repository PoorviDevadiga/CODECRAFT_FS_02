const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ import middleware

// ✅ CREATE - Add new employee (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, position, salary } = req.body;

    if (!name || !email || !position || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this email already exists" });
    }

    const newEmployee = new Employee({ name, email, position, salary });
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
});

// ✅ READ - Get all employees (Protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
});

// ✅ READ - Get employee by ID (Protected)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
});

// ✅ UPDATE - Update employee by ID (fix duplicate email issue)
router.put("/:id", async (req, res) => {
  try {
    const { name, email, position, salary } = req.body;

    // Check if email already exists (excluding current employee)
    if (email) {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee && existingEmployee._id.toString() !== req.params.id) {
        return res.status(400).json({ message: "Email already in use by another employee" });
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, salary },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
}); 

// ✅ DELETE - Remove employee by ID (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
});

module.exports = router; 