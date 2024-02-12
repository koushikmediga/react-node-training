document.addEventListener('DOMContentLoaded', function () {
    // Dummy employee data
    let employees = [
        { name: "John Doe", employeeId: "E001", dob: "1990-01-01", department: "HR", employmentType: "Full-time" },
        { name: "Jane Smith", employeeId: "E002", dob: "1985-05-15", department: "IT", employmentType: "Part-time" },
        { name: "Bob Johnson", employeeId: "E003", dob: "1988-11-30", department: "Finance", employmentType: "Contract" }
    ];

    const employeeForm = document.getElementById('employeeForm');
    const employeeList = document.getElementById('employeeList');

    // Function to populate employee table
    function populateEmployeeTable() {
        // Clear existing table content
        employeeList.innerHTML = '';
        
        // Loop through employees and add rows to the table
        employees.forEach(employee => {
            const row = employeeList.insertRow();
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.employeeId}</td>
                <td>${employee.dob}</td>
                <td>${employee.department}</td>
                <td>${employee.employmentType}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
        });
    }
    populateEmployeeTable();

    // Function to handle form submission for adding an employee
    employeeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Retrieve form values
        const name = this.name.value.trim();
        const employeeId = this.employeeId.value.trim();
        const dob = this.dob.value;
        const department = this.department.value.trim();
        const employmentType = this.employmentType.value.trim();

        // Validate form fields
        if (!name || !employeeId || !dob || !department || !employmentType) {
            alert('All fields are required.');
            return;
        }

        // Add the new employee to the array
        employees.push({ name, employeeId, dob, department, employmentType });

        // Update the table
        populateEmployeeTable();

        // Reset the form
        this.reset();
    });

    // Function to handle editing an employee
    function editEmployee(employee) {
        // Populate the form fields with the employee's data
        document.getElementById('name').value = employee.name;
        document.getElementById('employeeId').value = employee.employeeId;
        document.getElementById('dob').value = employee.dob;
        document.getElementById('department').value = employee.department;
        document.getElementById('employmentType').value = employee.employmentType;

        // Change submit button to update button
        document.getElementById('addBtn').textContent = 'Update Employee';
        document.getElementById('addBtn').setAttribute('data-index', employees.indexOf(employee));
    }

    // Function to handle deleting an employee
    function deleteEmployee(event) {
        // Find the index of the employee's row in the table
        const employeeRow = event.target.closest('tr');
        const index = employeeRow.rowIndex - 1; // Adjusting for table header
        
        // Remove the employee from the array
        employees.splice(index, 1);
        
        // Repopulate the table
        populateEmployeeTable();
    }

    // Add event listener to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteEmployee);
    });

    // Function to handle updating an employee
    function updateEmployee(index) {
        // Retrieve form values
        const name = document.getElementById('name').value.trim();
        const employeeId = document.getElementById('employeeId').value.trim();
        const dob = document.getElementById('dob').value;
        const department = document.getElementById('department').value.trim();
        const employmentType = document.getElementById('employmentType').value.trim();

        // Validate form fields
        if (!name || !employeeId || !dob || !department || !employmentType) {
            alert('All fields are required.');
            return;
        }

        // Remove the existing employee from the array and replace with updated values
        const updatedEmployee = { name, employeeId, dob, department, employmentType };
        employees.splice(index, 1, updatedEmployee);

        // Repopulate the table
        populateEmployeeTable();

        // Reset the form and change button text
        employeeForm.reset();
        document.getElementById('addBtn').textContent = 'Add Employee';
    }

    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get employee data from the clicked row and trigger edit function
            const employeeRow = button.closest('tr');
            const name = employeeRow.cells[0].textContent;
            const employeeId = employeeRow.cells[1].textContent;
            const dob = employeeRow.cells[2].textContent;
            const department = employeeRow.cells[3].textContent;
            const employmentType = employeeRow.cells[4].textContent;
            const employee = { name, employeeId, dob, department, employmentType };
            editEmployee(employee);
        });
    });

    // Add event listener to handle updating an employee
    document.getElementById('addBtn').addEventListener('click', function () {
        // If there is an index attribute, it means an employee is being edited
        const index = this.getAttribute('data-index');
        if (index) {
            updateEmployee(index);
        }
    });
});
