require("dotenv").config();
const mongoose = require("mongoose");
const Assignment = require("./models/Assignment");

mongoose.connect(process.env.MONGO_URI);

const seedAssignments = async () => {
  try {
    await Assignment.deleteMany();

    await Assignment.insertMany([
      {
        title: "Select All Employees",
        description: "Retrieve all employees from the employees table.",
        difficulty: "Easy",
        tables: [
          {
            name: "employees",
            schemaDefinition: "id INT, name VARCHAR(50), salary INT",
            samplePreview: [
              { id: 1, name: "John", salary: 50000 },
              { id: 2, name: "Jane", salary: 60000 },
              { id: 3, name: "Mark", salary: 45000 }
            ]
          }
        ]
      },

      {
        title: "Employees With Salary Greater Than 50000",
        description: "Retrieve employees whose salary is greater than 50000.",
        difficulty: "Easy",
        tables: [
          {
            name: "employees",
            schemaDefinition: "id INT, name VARCHAR(50), salary INT",
            samplePreview: [
              { id: 1, name: "John", salary: 50000 },
              { id: 2, name: "Jane", salary: 60000 },
              { id: 3, name: "Mark", salary: 45000 }
            ]
          }
        ]
      },

      {
        title: "Join Employees and Departments",
        description: "Join employees and departments tables to show employee name and department name.",
        difficulty: "Medium",
        tables: [
          {
            name: "employees",
            schemaDefinition: "id INT, name VARCHAR(50), dept_id INT",
            samplePreview: [
              { id: 1, name: "John", dept_id: 1 },
              { id: 2, name: "Jane", dept_id: 2 }
            ]
          },
          {
            name: "departments",
            schemaDefinition: "id INT, dept_name VARCHAR(50)",
            samplePreview: [
              { id: 1, dept_name: "Engineering" },
              { id: 2, dept_name: "HR" }
            ]
          }
        ]
      },

      {
        title: "Total Sales by Department",
        description: "Calculate total sales per department using GROUP BY.",
        difficulty: "Medium",
        tables: [
          {
            name: "sales",
            schemaDefinition: "department VARCHAR(50), amount INT",
            samplePreview: [
              { department: "Electronics", amount: 1000 },
              { department: "Electronics", amount: 2000 },
              { department: "Clothing", amount: 500 }
            ]
          }
        ]
      },

      {
        title: "Employees Above Average Salary",
        description: "Find employees earning more than the average salary.",
        difficulty: "Hard",
        tables: [
          {
            name: "employees",
            schemaDefinition: "id INT, name VARCHAR(50), salary INT",
            samplePreview: [
              { id: 1, name: "John", salary: 50000 },
              { id: 2, name: "Jane", salary: 60000 },
              { id: 3, name: "Mark", salary: 45000 },
              { id: 4, name: "Sara", salary: 70000 }
            ]
          }
        ]
      }
    ]);

    console.log("Assignments Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAssignments();