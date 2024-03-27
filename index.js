/* ---------------- */
// app.js
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const db = require('./db')

const app = express();
const port = 3000;


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.get("/students", async (req, res) => {
  try {
    // const result = await db.query("SELECT * FROM students");
    const allStudents = await prisma.students.findMany();
    res.status(200).json({
      status: "success",
      data: allStudents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    // const result = await db.query(
    //   `INSERT into students (name, address) values ('${name}', '${address}')`
    // );
    await prisma.students.create({
      data: {
        name: name,
        address: address,
      }
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Student by ID


// Delete Student by ID

// Get student by ID


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/* ----------------- */
