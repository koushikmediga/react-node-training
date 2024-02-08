const express = require('express');
const bodyParser = require('body-parser');
const Employee = require('./employees'); 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());


// Create a new Employee
app.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all employees with sorting 
app.get('/employees', async (req, res) => {
    try {
        const { sort } = req.query;
        const order = [['name', 'ASC']]; // Default in ascending order

        // If sort query parameter is provided and equals 'desc', sort in descending order
        if (sort === 'desc') {
            order[0][1] = 'DESC';
        }

        const employees = await Employee.findAll({
            order // Apply sorting
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an employee by ID
app.get('/employees/id/:id', async (req, res) => {
    try {
        const {id } = req.params;

        // Find the employee by ID
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an employee by name
app.get('/employees/name/:employeeName', async (req, res) => {
    try {
        const { employeeName } = req.params;

        // Find the employee by name
        const employee = await Employee.findOne({
            where: { name: employeeName }
        });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update an employee by id

app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params; // Accessing id from route params
        const updatedEmployee = await Employee.update(req.body, {
            where: { id },
            returning: true // Return the updated employee
        });
        if (updatedEmployee[0] === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Log the ID of the updated employee
        console.log(`Employee with ID ${id} updated successfully`);

        res.json(updatedEmployee[1][0]); // Return the updated employee
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Delete an employee by employeeId if employee is not active
app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        if (employee.isActive) {
            return res.status(400).json({ error: 'Cannot delete active employee' });
        }
        await employee.destroy();
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

