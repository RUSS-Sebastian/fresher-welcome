
function handleClick(section){
  if(section=='kingqueen'){
    window.location.href='kq.html';
  }

  else if(section=='registration'){
    window.location.href='index.html';
  }

  else if(section=='food'){
    window.location.href='';
  }

  else if(section=='activities'){
    window.location.href='/protected/view';
  }

  else if(section=='feedback'){
    window.location.href='/protected/feed';
  }

  else{
    console.warn('Unknown  section:',section);
  }

}

async function showAdminButton() {
    try {
        // Fetch current user info
        const res = await fetch("/api/users/me", { credentials: "include" });
        if (!res.ok) return;

        const user = await res.json();

        // Check role
        if (user.role.toUpperCase() === "ADMIN") {
            const btn = document.getElementById("admin-dashboard-btn");
            btn.style.display = "block";

            // Add click event
            btn.addEventListener("click", () => {
                window.location.href = "/admin/dashboard";
            });
        }
    } catch (err) {
        console.error("Error fetching current user:", err);
    }
}

// Run on page load
window.addEventListener("DOMContentLoaded", showAdminButton);


async function showUsername() {
    try {
        // Fetch current user info
        const res = await fetch("/api/users/me", { credentials: "include" });
        if (!res.ok) return;

        const user = await res.json();

        // Set username text
        const usernameContainer = document.getElementById("username-container");
        document.getElementById("username-text").textContent = user.name; // or user.username

        // Adjust bottom based on admin button visibility
        const adminBtn = document.getElementById("admin-dashboard-btn");
        if (adminBtn && adminBtn.style.display === "none") {
            usernameContainer.style.bottom = "80px"; // move down when admin button hidden
        } else {
            usernameContainer.style.bottom = "140px"; // default position above admin button
        }

    } catch (err) {
        console.error("Error fetching current user:", err);
    }
}

// Run on page load
window.addEventListener("DOMContentLoaded", showUsername);


// Run on page load
window.addEventListener("DOMContentLoaded", showUsername);


document.getElementById('admin-dashboard-btn').addEventListener('click', function () {
  window.location.href = "/admin/dashboard";
});

document.querySelector('.logout-button').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent immediate navigation
  document.getElementById('logout-modal').style.display = 'flex';
});

document.getElementById('confirm-no').addEventListener('click', function () {
  document.getElementById('logout-modal').style.display = 'none';
});

document.getElementById('confirm-yes').addEventListener('click', async function () {
  try {

    // First fetch CSRF token
    const csrfResponse = await fetch('/csrf-token');
    const csrfData = await csrfResponse.json();

    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        [csrfData.headerName]: csrfData.token // 🔑 if CSRF is enabled
      }
    });

    if (response.ok) {
      console.log("Log out successfully");
      alert("Logged out successfully!");
      window.location.href = "/Page/login.html";
    } else {
      console.error("Logout failed:", response.status);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
});
