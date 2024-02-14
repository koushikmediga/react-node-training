const Employee = require('./employees');

exports.createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const { sort } = req.query;
        const order = [['name', 'ASC']]; // Default in ascending order

        if (sort === 'desc') {
            order[0][1] = 'DESC';
        }

        const employees = await Employee.findAll({ order });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmployeebyId = async(req,res) => {
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
};

exports.getEmployeebyName = async(req,res) => {
    try{
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
};

exports.updateEmployee = async(req,res) => {
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
};

exports.deleteEmployee = async(req,res) => {
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
};


