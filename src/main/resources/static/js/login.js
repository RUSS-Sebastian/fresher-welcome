 const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const errorElem = document.getElementById('error');
  const successElem = document.getElementById('success');

  // Helper: Clear messages
  const clearMessages = () => {
    errorElem.textContent = '';
    successElem.textContent = '';
  };

  // Helper: Validate TNT
  const isValidTNT = (tntStr) => {
    const tnt = parseInt(tntStr, 10);
    return !isNaN(tnt) && tnt >= 1 && tnt <= 2600;
  };

  // Helper: Validate email
  const isValidEmail = (email) => {
    return email.toLowerCase().endsWith('uit.edu.mm');
  };

  // Helper: Validate password strength
  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    // Get values
    const name = form.name.value.trim();
    const tntStr = form.tnt.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const gender = form.gender.value;

    // Validations
    if (!isValidTNT(tntStr)) {
      errorElem.textContent = 'TNT must be a number between 1 and 2600.';
      return;
    }
    if (!isValidEmail(email)) {
      errorElem.textContent = 'Email must end with "uit.edu.mm".';
      return;
    }
    if (!isValidPassword(password)) {
      errorElem.textContent = 'Password must be at least 8 characters and include lowercase, uppercase, number, and special character.';
      return;
    }

    // Prepare payload
    const data = {
      name,
      tnt: tntStr,
      email,
      hashedPassword: password,
      role: 'student',
      gender: gender.toLowerCase(),
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        errorElem.textContent = `Registration failed: ${errorMsg}`;
      } else {
        alert('Registered successfully! Please log in again.');
        form.reset();
        // If you need to toggle container class here, define container above and uncomment:
        // container.classList.remove("active");
        container.classList.remove("active");
      }
    } catch (err) {
      errorElem.textContent = 'Network error: ' + err.message;
    }
  });
});


document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const errorElem = document.getElementById('error');
  errorElem.textContent = '';

  const name = document.getElementById('name2').value.trim();
  const password = document.getElementById('password2').value;

  try {

    // First fetch CSRF token
    const csrfResponse = await fetch('/csrf-token');
    const csrfData = await csrfResponse.json();

    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        [csrfData.headerName]: csrfData.token
      },
      body: JSON.stringify({ name, password })
    });

    if (response.ok) {
      // Login success: redirect to home.html
      window.location.href = '/protected/home';
    } else {
      const errorText = await response.text();
      alert(errorText || 'Login failed');

         // Clear form fields
      document.getElementById('loginForm').reset();

    }
  } catch (err) {
    errorElem.textContent = 'Network error: ' + err.message;
  }
});

