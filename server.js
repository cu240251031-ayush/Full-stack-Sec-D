
const express = require("express");

const app = express();
app.use(express.json());

let students = [];
let nextId = 1;

// POST: Create a student
app.post("/students", (req, res) => {
    const { name, email, age } = req.body;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !Number.isInteger(age) ||
        age <= 0
    ) {
        return res.status(400).json({ error: "Invalid input" });
    }

    if (students.some(s => s.email.toLowerCase() === email.trim().toLowerCase())) {
        return res.status(409).json({ error: "Email already exists" });
    }

    const student = {
        id: nextId++,
        name: name.trim(),
        email: email.trim(),
        age
    };

    students.push(student);
    res.status(201).json(student);
});

// GET: List all students, optionally filter by minimum age
app.get("/students", (req, res) => {
    const { minAge } = req.query;

    if (minAge !== undefined) {
        if (minAge.trim() === "" || !Number.isFinite(Number(minAge))) {
            return res.status(400).json({ error: "Invalid input" });
        }

        const age = Number(minAge);
        const filtered = students.filter(s => s.age >= age);
        return res.status(200).json(filtered);
    }

    res.status(200).json(students);
});

// GET: Fetch a student by ID
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!Number.isInteger(id) || id <= 0 || !student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
});

// DELETE: Delete a student by ID
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (!Number.isInteger(id) || id <= 0 || index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    students.splice(index, 1);
    res.status(204).end();
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
