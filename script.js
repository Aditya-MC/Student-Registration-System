// Reference to form element
const form = document.getElementById('studentForm');
let editIndex = null;

// Check for ?edit= in URL to load data into form
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const edit = urlParams.get('edit');

  if (edit !== null) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[edit];

    if (student) {
      // Pre-fill form with existing data
      document.getElementById('name').value = student.name;
      document.getElementById('studentId').value = student.studentId;
      document.getElementById('email').value = student.email;
      document.getElementById('contact').value = student.contact;
      editIndex = edit;
    }
  }
};

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  // --- VALIDATIONS ---

  // Check for empty fields
  if (!name || !studentId || !email || !contact) {
    alert('All fields are required.');
    return;
  }

  // Name = only letters
  if (!/^[A-Za-z\s]+$/.test(name)) {
    alert('Name should contain only letters.');
    return;
  }

  // Student ID = only digits
  if (!/^\d+$/.test(studentId)) {
    alert('Student ID should be numeric.');
    return;
  }

  // Contact = 10-digit number
  if (!/^\d{10}$/.test(contact)) {
    alert('Contact should be a 10-digit number.');
    return;
  }

  // Email = valid format
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('Invalid email address.');
    return;
  }

  // --- PROCESSING ---

  const students = JSON.parse(localStorage.getItem('students')) || [];
  const student = { name, studentId, email, contact };

  if (editIndex !== null) {
    // Edit existing student
    students[editIndex] = student;
    alert("Student record updated successfully!");
    editIndex = null;
  } else {
    // Add new student
    students.push(student);
    alert("Student added successfully!");
  }

  // Save to localStorage
  localStorage.setItem('students', JSON.stringify(students));

  // Clear form fields
  form.reset();
});
