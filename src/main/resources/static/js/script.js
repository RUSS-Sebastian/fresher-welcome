// Sample notifications data
let notifications = [
    {
        id: 1,
        type: 'message',
        title: 'New message from Sarah',
        message: 'Hey! Just wanted to check in about the project status.',
        time: '2 minutes ago',
        unread: true,
        icon: '💬'
    },
    {
        id: 2,
        type: 'system',
        title: 'System update completed',
        message: 'Your system has been successfully updated to version 2.1.0',
        time: '1 hour ago',
        unread: true,
        icon: '⚙️'
    },
    {
        id: 3,
        type: 'warning',
        title: 'Storage almost full',
        message: 'Your storage is 85% full. Consider upgrading your plan.',
        time: '3 hours ago',
        unread: true,
        icon: '⚠️'
    }
];

let userId = null;
let csrfToken = null;
let csrfHeaderName = null;
let isDropdownOpen = false;
let displayedMessageIds = new Set();

async function updateNotificationBadge(userId) {
    try {
        const response = await fetch(`/api/messages/count/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch message count");
        }

        const count = await response.json();
        const badge = document.getElementById('notificationBadge');

        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }

        console.log("📨 Message count:", count);
    } catch (err) {
        console.error("⚠️ Error updating notification badge:", err);
    }
}


// Helper to format time as "x hours ago"
function timeAgo(submittedTime) {
    const now = new Date();
    const submitted = new Date(submittedTime); // backend sends ISO string
    const diffMs = now - submitted;

    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// Fetch & render notifications dynamically
async function renderNotifications(userId) {
    const notificationsList = document.getElementById('notificationsList');

    try {
        const res = await fetch(`/api/messages/user/${userId}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch notifications");

        const notifications = await res.json();

        if (notifications.length === 0) {
            notificationsList.innerHTML = `
                <div class="p-8 text-center text-gray-500">
                    <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                        🔔
                    </div>
                    <p class="font-medium">No notifications</p>
                    <p class="text-sm">You are all caught up!</p>
                </div>
            `;
            return;
        }

        notificationsList.innerHTML = notifications.map((n) => {
            // Store displayed message ID globally
            displayedMessageIds.add(n.id);

            return `
                <div class="notification-item p-4 border-b border-gray-100 cursor-pointer ${n.status === 'UNREAD' ? 'bg-blue-50' : ''}"
                     onclick="markAsRead(${n.id})">
                    <div class="flex items-start space-x-3">
                        <div class="text-2xl">&#x1F514;</div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900 ${n.status === 'UNREAD' ? 'font-semibold' : ''}">${n.title}</p>
                                ${n.status === 'UNREAD' ? '<div class="w-2 h-2 bg-blue-600 rounded-full"></div>' : ''}
                            </div>
                            <p class="text-sm text-gray-600 mt-1">${n.content}</p>
                            <p class="text-xs text-gray-500 mt-2">${timeAgo(n.submittedTime)}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        console.log(displayedMessageIds);

    } catch (err) {
        console.error("Error loading notifications:", err);
        notificationsList.innerHTML = `<p class="text-red-500 p-4">Failed to load notifications</p>`;
    }
}

async function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    const btn = document.getElementById('notificationBtn');

    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
        dropdown.classList.add('show');
        await renderNotifications(userId);
    } else {
        dropdown.classList.remove('show');

        // Call backend to mark messages as READ
        if (displayedMessageIds.size > 0) {
            try {
                const res = await fetch("/api/messages/read", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json",[csrfHeaderName]: csrfToken },
                    body: JSON.stringify([...displayedMessageIds])
                });

                if (res.ok) {
                    console.log("Messages marked as read successfully");
                    displayedMessageIds.clear(); // clear after successful sync
                } else {
                    console.warn("Failed to mark messages as read");
                }
            } catch (err) {
                console.error("Error syncing read messages:", err);
            }
        }

        updateNotificationBadge(userId);
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationDropdown');
    const btn = document.getElementById('notificationBtn');

    if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
        if (isDropdownOpen) {
            toggleNotifications();
        }
    }
});







function handleClick(section){
  if(section=='kingqueen'){
    window.location.href='kq.html';
  }

  else if(section=='registration'){
    window.location.href='/protected/index';
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
        userId = user.id;

        updateNotificationBadge(userId);

        const csrfResponse = await fetch("/csrf-token");
        const csrfData = await csrfResponse.json();
        csrfToken = csrfData.token;
        csrfHeaderName = csrfData.headerName;
        console.log("CSRF Token Loaded:", csrfHeaderName, csrfToken);

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

//Run on page load
window.addEventListener("DOMContentLoaded",showUsername);

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
