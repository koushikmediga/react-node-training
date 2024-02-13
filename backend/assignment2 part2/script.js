document.addEventListener('DOMContentLoaded', function () {
    // Display tab1 by default
    openTab('tab1');
  
    // Fetch and display employees when tab1 is opened
    document.getElementById('tab1Btn').addEventListener('click', function() {
      fetchAndDisplayEmployees();
    });
  
    // Handle form submission for adding employee
    document.getElementById('employeeForm').addEventListener('submit', function(event) {
      event.preventDefault();
      addEmployee();
    });
  });
  
  function openTab(tabName) {
    // Hide all tab contents
    var tabcontents = document.getElementsByClassName('tabcontent');
    for (var i = 0; i < tabcontents.length; i++) {
      tabcontents[i].style.display = 'none';
    }
  
    // Deactivate all tab buttons
    var tablinks = document.getElementsByClassName('tablinks');
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }
  
    // Display the selected tab content
    document.getElementById(tabName).style.display = 'block';
  
    // Activate the selected tab button
    document.getElementById(tabName + 'Btn').classList.add('active');
  
    // If the selected tab is tab2, display the employee form
    if (tabName === 'tab2') {
      document.getElementById('employeeFormContainer').style.display = 'block';
    }
  }
  
  function fetchAndDisplayEmployees() {
    fetch('http://localhost:3000/employees')
      .then(response => response.json())
      .then(data => {
        var tableHtml = '<table>';
        tableHtml += '<tr><th>Name</th><th>Employee ID</th><th>Date of Birth</th><th>Department</th><th>Employment Type</th><th>Active</th></tr>';
        data.forEach(employee => {
          tableHtml += `<tr>
                        <td>${employee.name}</td>
                        <td>${employee.employeeId}</td>
                        <td>${employee.dob}</td>
                        <td>${employee.department}</td>
                        <td>${employee.employmentType}</td>
                        <td>${employee.isActive ? 'Yes' : 'No'}</td>
                        <td>
                          <button class="editBtn" onclick="handleEdit(${employee.id})">Edit</button>
                          <button class="deleteBtn" onclick="handleDelete(${employee.id})">Delete</button>
                        </td>
                      </tr>`;
        });
        tableHtml += '</table>';
        document.getElementById('tab1').innerHTML = tableHtml;
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }
  
  function addEmployee() {
    const formData = new FormData(document.getElementById('employeeForm'));
    const employeeData = {};
    formData.forEach((value, key) => {
      employeeData[key] = value;
    });
  
    fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Employee added successfully:', data);
        // Fetch and display the updated list of employees in tab 1
        fetchAndDisplayEmployees();
        // Redirect to tab1 to show all employees after adding employee
        openTab('tab1');
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
  }
  
  function handleEdit(employeeId) {
    // Ask for confirmation before proceeding with edit
    if (confirm('Are you sure you want to edit this employee?')) {
        // Fetch the employee data from the backend based on the employeeId
        fetch(`http://localhost:3000/employees/${employeeId}`)
            .then(response => response.json())
            .then(employee => {
                // Prefill the employee data in the form in tab2
                document.getElementById('name').value = employee.name;
                document.getElementById('employeeId').value = employee.employeeId;
                document.getElementById('dob').value = employee.dob;
                document.getElementById('department').value = employee.department;
                document.getElementById('employmentType').value = employee.employmentType;

                // Open tab2
                openTab('tab2');
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    } else {
        // If user cancels the edit, do nothing
        console.log('Edit canceled by user');
    }
}


  
  