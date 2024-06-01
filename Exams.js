
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

let students = [];

// Add Student
app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send(student);
});

// Edit Student
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const updatedStudent = req.body;

    let student = students.find(student => student.id === id);

    if (student) {
        Object.assign(student, updatedStudent);
        res.send(student);
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});

// Delete Student
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;

    let studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.send({ message: 'Student deleted' });
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(Server running at http://localhost:${port}/);
});