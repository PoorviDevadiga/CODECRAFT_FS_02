const API_URL = "http://localhost:5000/api";
let token = "";

// Signup
async function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message || "Signup done");
}

// Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    token = data.token;
    alert("Login successful!");
    document.getElementById("employeeActions").classList.remove("hidden");
    document.getElementById("employeesSection").classList.remove("hidden");
    document.getElementById("searchSection").classList.remove("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");
    getEmployees();
  } else {
    alert(data.message || "Login failed");
  }
}

// Logout
function logout() {
  token = "";
  alert("Logged out!");
  location.reload();
}
document.getElementById("logoutBtn").addEventListener("click", logout);

// Add Employee
async function addEmployee() {
  const name = document.getElementById("empName").value;
  const email = document.getElementById("empEmail").value;
  const position = document.getElementById("empPosition").value;
  const salary = document.getElementById("empSalary").value;

  const res = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, email, position, salary })
  });

  const data = await res.json();
  alert(data.message || "Employee added");
  getEmployees();
}

// Get Employees
async function getEmployees() {
  const res = await fetch(`${API_URL}/employees`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const employees = await res.json();

  const list = document.getElementById("employeesList");
  list.innerHTML = "";

  employees.forEach(emp => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <h3>${emp.name}</h3>
      <p>${emp.email}</p>
      <p>${emp.position} - $${emp.salary}</p>
      <div class="employee-actions">
        <button onclick="updateEmployee('${emp._id}')">Update</button>
        <button onclick="deleteEmployee('${emp._id}')">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

// Update Employee
async function updateEmployee(id) {
  const newName = prompt("Enter new name:");
  const newPosition = prompt("Enter new position:");
  const newSalary = prompt("Enter new salary:");

  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name: newName, position: newPosition, salary: newSalary })
  });

  const data = await res.json();
  alert(data.message || "Updated employee");
  getEmployees();
}

// Delete Employee
async function deleteEmployee(id) {
  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await res.json();
  alert(data.message || "Deleted employee");
  getEmployees();
}

// Filter Employees
function filterEmployees() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".employee-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
} 
