// Function to fetch and display all employees in Tab1
function fetchAndDisplayEmployees() {
    fetch('http://localhost:3000/employees')
      .then(response => response.json())
      .then(data => {
        // Update UI to display employee data in Tab1
        const employeeTable = document.getElementById('employeeTable');
        employeeTable.innerHTML = ''; // Clear existing data
        data.forEach(employee => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.employeeId}</td>
            <td>${employee.dob}</td>
            <td>${employee.department}</td>
            <td>${employee.employmentType}</td>
            <td>${employee.isActive ? 'Yes' : 'No'}</td>
            <td>
              <button onclick="editEmployee(${employee.id})">Edit</button>
              <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
          `;
          employeeTable.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }
  
  function addEmployee(formData) {
    fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Update UI to display the new employee in the employee list
        const employeeTable = document.getElementById('employeeTable');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.employeeId}</td>
            <td>${data.dob}</td>
            <td>${data.department}</td>
            <td>${data.employmentType}</td>
            <td>${data.isActive ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="editEmployee(${data.id})">Edit</button>
                <button onclick="deleteEmployee(${data.id})">Delete</button>
            </td>
        `;
        employeeTable.appendChild(row);

        // Redirect to Tab1 after successful submission
        document.getElementById('tab1Btn').click(); // Simulate click on Tab1 button
    })
    .catch(error => {
        console.error('Error adding employee:', error);
    });
}


  
  // Function to fetch and populate employee details in Tab2 for editing
  function editEmployee(employeeId) {
    fetch(`http://localhost:3000/employees/id/${employeeId}`)
      .then(response => response.json())
      .then(employee => {
        // Populate form fields in Tab2 with employee details
        document.getElementById('name').value = employee.name;
        document.getElementById('employeeId').value = employee.employeeId;
        document.getElementById('dob').value = employee.dob;
        document.getElementById('department').value = employee.department;
        document.getElementById('employmentType').value = employee.employmentType;
        
        // Show Tab2
        openTab('tab2');
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  }

  
  // Function to update employee details in Tab2
  function updateEmployee(employeeId, formData) {
    fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Redirect to Tab1 after successful update
      fetchAndDisplayEmployees();
      document.getElementById('tab1Btn').click(); // Simulate click on Tab1 button
    })
    .catch(error => {
      console.error('Error updating employee:', error);
    });
  }
  
  // Function to delete an employee in Tab1
  function deleteEmployee(employeeId) {
    fetch(`http://localhost:3000/employees/id/${employeeId}`, {
      method: 'DELETE',
    })
    .then(() => {
        // Reload the page or refresh employee list after deletion
        fetchAndDisplayEmployees();
        document.getElementById('tab1').click(); // Simulate click on Tab1 button
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  }

  function openTab(tabId) {
    // Hide all tabs
    const tabs = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    // Show the selected tab
    document.getElementById(tabId).style.display = 'block';
}


document.getElementById('viewEmployeesBtn').addEventListener('click', function() {
    openTab('tab1'); // Show Tab1
    fetchAndDisplayEmployees(); // Fetch and display employees
});

document.getElementById('addEmployeeBtn').addEventListener('click', function() {
    openTab('tab2'); // Show Tab2
});

