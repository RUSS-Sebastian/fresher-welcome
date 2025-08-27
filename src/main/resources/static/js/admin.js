const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const feedbackCard = document.getElementById('feedbackCard');
const content_area = document.querySelector('.content-area');
const eventCard = document.getElementById('EventCard');
const foodCard = document.getElementById('FoodCard');
const vCard = document.getElementById('VolCard');
const vNum = document.getElementById('VolNum');
const approvedVCard = document.getElementById('ApprovedCard');
let formIsOpen = false;
let csrfToken = null;
let csrfHeaderName = null;
let currentUser = null;

window.addEventListener("DOMContentLoaded", async () => {
      // 1. Fetch CSRF token
      const csrfResponse = await fetch("/csrf-token");
      const csrfData = await csrfResponse.json();
      csrfToken = csrfData.token;
      csrfHeaderName = csrfData.headerName;
      console.log("CSRF Token Loaded:", csrfHeaderName, csrfToken);
});

async function loadCurrentUser() {
  try {
    const response = await fetch("/api/users/me");
    currentUser = await response.json();
    console.log("Current User Loaded:", currentUser);

    // Once ready, show the username
    showUsername();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
function showUsername() {
  if (currentUser) {
    document.querySelector(".username").textContent = currentUser.name;
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", loadCurrentUser());

menuBtn.addEventListener('click', () => {
    menuBtn.classList.add('rotate-once');
    setTimeout(() => {
        menuBtn.classList.remove('rotate-once');
    }, 600);

    sidebar.classList.toggle('collapsed');

    // Update layout based on sidebar size
    const isCollapsed = sidebar.classList.contains('collapsed');
    const Left = isCollapsed ? '60px' : '300px';
    const contentWidth = isCollapsed ? 'calc(100vw - 60px)' : 'calc(100vw - 300px)';
    const cardWidth = isCollapsed ? '50%' : '40%';
    //const cardMarginLeft = isCollapsed ? '80px' : '320px';

    content_area.style.left = Left;
    content_area.style.width = contentWidth;

    //feedbackCard.style.marginLeft = cardMarginLeft;
    //feedbackCard.style.width = cardWidth;

});

document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(".sidebar .sidebar-item");
    const mainContent = document.querySelector(".main-content");
    const feedbackCard = document.getElementById("feedbackCard");
    const chart = document.getElementById("sideInfo");
    const king = document.getElementById("kingInfo");
    const queen = document.getElementById("QueenInfo");
    const voteCard = document.getElementById("VoteCard");
    const aCard = document.getElementById("ActivityCard");

    // Function to update active state and show corresponding container
    function updateActive(link) {
        sidebarLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        const text = link.querySelector(".link-text").textContent.trim();

        // Show/hide content areas
        if (text === "Starters") {
            mainContent.style.display = "flex";
            feedbackCard.style.display = "none";
            chart.style.display = "none";
            eventCard.style.display = "none";
            king.style.display = "none";
            queen.style.display = "none";
            voteCard.style.display = "none";
            aCard.style.display = "none";
            foodCard.style.display = "none";
            vCard.style.display = "none";
            vNum.style.display = "none";
            approvedVCard.style.display = "none";

        }else if(text == "Volunteer"){
          mainContent.style.display = "none";
          feedbackCard.style.display = "none";
          chart.style.display = "none";
          eventCard.style.display = "none";
          king.style.display = "none";
          queen.style.display = "none";
          voteCard.style.display = "none";
          aCard.style.display = "none";
          foodCard.style.display = "none";
          vCard.style.display = "block";
          vNum.style.display = "block";
          approvedVCard.style.display = "block";

        } else if (text === "Feedback") {
            mainContent.style.display = "none";
            feedbackCard.style.display = "block";
            chart.style.display = "flex";
            eventCard.style.display = "none";
            king.style.display = "none";
            queen.style.display = "none";
            voteCard.style.display = "none";
            aCard.style.display = "none";
            foodCard.style.display = "none";
            vCard.style.display = "none";
            vNum.style.display = "none";
            approvedVCard.style.display = "none";

        }else if(text == "Event"){
            mainContent.style.display = "none";
            feedbackCard.style.display = "none";
            chart.style.display = "none";
            eventCard.style.display = "block";
            king.style.display = "none";
            queen.style.display = "none";
            voteCard.style.display = "none";
            aCard.style.display = "none";
            foodCard.style.display = "none";
            vCard.style.display = "none";
            vNum.style.display = "none";
            approvedVCard.style.display = "none";

        }else if(text == "Voting"){
            king.style.display = "flex";
            mainContent.style.display = "none";
            feedbackCard.style.display = "none";
            chart.style.display = "none";
            eventCard.style.display = "none";
            queen.style.display = "flex";
            voteCard.style.display = "block";
            aCard.style.display = "none";
            foodCard.style.display = "none";
            vCard.style.display = "none";
            vNum.style.display = "none";
            approvedVCard.style.display = "none";

        }else if(text == "Activity"){
          mainContent.style.display = "none";
          feedbackCard.style.display = "none";
          chart.style.display = "none";
          eventCard.style.display = "none";
          king.style.display = "none";
          queen.style.display = "none";
          voteCard.style.display = "none";
          aCard.style.display = "block";
          foodCard.style.display = "none";
          vCard.style.display = "none";
          vNum.style.display = "none";
          approvedVCard.style.display = "none";

        }else if(text == "Food Seller"){
          mainContent.style.display = "none";
          feedbackCard.style.display = "none";
          chart.style.display = "none";
          eventCard.style.display = "none";
          king.style.display = "none";
          queen.style.display = "none";
          voteCard.style.display = "none";
          aCard.style.display = "none";
          foodCard.style.display = "block";
          vCard.style.display = "none";
          vNum.style.display = "none";
          approvedVCard.style.display = "none";

        }else {
            mainContent.style.display = "none";
            feedbackCard.style.display = "none";
            chart.style.display = "none";
            eventCard.style.display = "none";
            king.style.display = "none";
            queen.style.display = "none";
            voteCard.style.display = "none";
            aCard.style.display = "none";
            foodCard.style.display = "none";
            vCard.style.display = "none";
            vNum.style.display = "none";
            approvedVCard.style.display = "none";
        }
    }

    // Set default to Starters
    if (sidebarLinks.length > 0) {
        updateActive(sidebarLinks[0]);
    }

    // Click event for all sidebar items
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            updateActive(link);
        });
    });
});


function updateUI() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusEmoji = document.getElementById('statusEmoji');
    const statusText = document.getElementById('statusText');
    const statusSubtext = document.getElementById('statusSubtext');
    const actionButton = document.getElementById('actionButton');
    const statusDisplay = document.getElementById('statusDisplay');

    // Add fade effect
    statusDisplay.classList.add('fade-in');
    setTimeout(() => statusDisplay.classList.remove('fade-in'), 500);

    if (formIsOpen) {
        // Form is open
        toggleSwitch.classList.add('active');
        statusEmoji.textContent = '🟢';
        statusText.textContent = 'Form Open';
        statusSubtext.textContent = 'Volunteers can submit applications';
        actionButton.textContent = 'Close Form';
        actionButton.className = 'w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200';
    } else {
        // Form is closed
        toggleSwitch.classList.remove('active');
        statusEmoji.textContent = '🔴';
        statusText.textContent = 'Form Closed';
        statusSubtext.textContent = 'Volunteers cannot submit applications';
        actionButton.textContent = 'Open Form';
        actionButton.className = 'w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200';
    }
}




document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/admin-buttons/volunteer_form_button");
        if (!response.ok) throw new Error("Network response was not ok");

        formIsOpen = await response.json(); // true / false from backend
        updateUI();
    } catch (error) {
        console.error("Error fetching button status:", error);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/admin-buttons/volunteer_form_button");
        if (!response.ok) throw new Error("Network response was not ok");

        formIsOpen = await response.json(); // true / false from backend
        updateUI();
    } catch (error) {
        console.error("Error fetching button status:", error);
    }
});

async function toggleForm() {
    formIsOpen = !formIsOpen;
    updateUI();


    try {
        await fetch(`/api/admin-buttons/volunteer_form_button?status=${formIsOpen}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [csrfHeaderName]: csrfToken,
            }
        });
    } catch (err) {
        console.error("Error updating button:", err);
    }
}

function confirmAction() {
    const action = formIsOpen ? 'close' : 'open';
    if (confirm(`Are you sure you want to ${action} the volunteer form?`)) {
        toggleForm();
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".feature-box");

    boxes.forEach(box => {
        const dropdown = box.querySelector(".dropdown-box");

        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();

            if (box.classList.contains("active")) {
                box.classList.remove("active");
                dropdown.textContent = "Start";
            } else {
                box.classList.add("active");
                dropdown.textContent = "Stop";
            }
        });
    });
});

document.getElementById('clickableHeaderRow').addEventListener('click', () => {
    const popup = new bootstrap.Modal(document.getElementById('popupEvent'));
    popup.show();
});

function getLocalDatetime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}








document.querySelector('#voteTable tbody').addEventListener('click', function (e) {
    if (e.target.closest('.delete-icon')) {
      const confirmed = confirm("Are you sure you want to delete?");
      if (confirmed) {
        const row = e.target.closest('tr');
        row.remove();
      }
    }
});

// Handle approve/reject clicks
document.querySelectorAll('.approve').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    row.querySelector('.badge').className = 'badge bg-success';
    row.querySelector('.badge').textContent = 'Approved';
    row.querySelectorAll('button').forEach(b => b.disabled = true);
    alert('Application Approved');
  });
});

document.querySelectorAll('.reject').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    row.querySelector('.badge').className = 'badge bg-danger';
    row.querySelector('.badge').textContent = 'Rejected';
    row.querySelectorAll('button').forEach(b => b.disabled = true);
    alert('Application Rejected');
  });
});

//Activity approve or reject
/* approve activity table*/
function approveActivity(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status-badge');
    const buttons = row.querySelectorAll('.action-btn');

    statusCell.className = 'status-badge status-approved';
    statusCell.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Approved';

    buttons.forEach(btn => btn.disabled = true);

    // Success animation
    row.style.backgroundColor = '#d1fae5';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 1000);
}

function rejectActivity(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status-badge');
    const buttons = row.querySelectorAll('.action-btn');

    statusCell.className = 'status-badge status-rejected';
    statusCell.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Rejected';

    buttons.forEach(btn => btn.disabled = true);

    // Rejection animation
    row.style.backgroundColor = '#fee2e2';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 1000);
}

//for food preorder and its dropdowns
function toggleDropdown(button) {
    const dropdown = button.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.dropdown');

    // Close all other dropdowns
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.style.display = 'none';
        }
    });

    // Toggle current dropdown
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function assignLocation(item, location) {
    const row = item.closest('tr');
    const assignedLocationCell = row.querySelector('.assigned-location');
    const dropdown = item.closest('.dropdown');

    // Update assigned location
    assignedLocationCell.textContent = location;
    assignedLocationCell.setAttribute('data-assigned', location);
    assignedLocationCell.classList.remove('assigned-none');
    assignedLocationCell.style.color = '#374151';
    assignedLocationCell.style.fontStyle = 'normal';

    // Close dropdown
    dropdown.style.display = 'none';

    // Success animation
    row.style.backgroundColor = '#d1fae5';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 1000);
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.assign-btn') && !event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});


/* food preorder form approve or decline*/
function approveFood(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status-badge');
    const buttons = row.querySelectorAll('.action-btn');

    // Disable action buttons
    buttons.forEach(btn => btn.disabled = true);

    // Disable the "Assign Location" button
    const assignBtn = row.querySelector('.assign-btn');
    if (assignBtn) {
        assignBtn.disabled = true;
    }

    // Update status cell
    statusCell.className = 'status-badge status-approved';
    statusCell.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Approved';

    // Success animation
    row.style.backgroundColor = '#d1fae5';
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 1000);
}

async function approveVol(vId, uId, button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status-badge');
    const buttons = row.querySelectorAll('.action-btn');

    // Disable buttons & update UI
    buttons.forEach(btn => btn.disabled = true);
    statusCell.className = 'status-badge status-approved';
    statusCell.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Approved';
    row.style.backgroundColor = '#d1fae5';
    setTimeout(() => row.style.backgroundColor = '', 1000);

    try {
        // Approve volunteer
        const volunteerRes = await fetch(`/api/volunteers/${vId}/status?status=APPROVED`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json', [csrfHeaderName]: csrfToken },
        });

        if (!volunteerRes.ok) throw new Error("Failed to approve volunteer");

        console.log("✅ Volunteer approved");

        // Send message separately
        const msgResult = await sendUserMessage(uId, "Approved Volunteer", "Admin approved your volunteer request successfully.");

        if (!msgResult.success) {
            alert("Volunteer approved but failed to send message: " + msgResult.message);
        } else {
            alert("Volunteer approved and user notified successfully!");
        }

        window.location.href = "/admin/dashboard";

    } catch (err) {
        console.error("❌ Error in approval flow:", err);

        // Rollback UI
        statusCell.className = 'status-badge status-pending';
        statusCell.innerHTML = '<i class="fas fa-clock mr-1"></i>Pending';
        buttons.forEach(btn => btn.disabled = false);

        alert("Failed to approve volunteer. Please try again.");
    }
}

async function rejectVol(vId, uId, button) {
    console.log("Reject clicked for vId:", vId);

    const row = button.closest('tr');
    const statusCell = row.querySelector('.status-badge');
    const buttons = row.querySelectorAll('.action-btn');

    // Disable buttons & update UI
    buttons.forEach(btn => btn.disabled = true);
    statusCell.className = 'status-badge status-rejected';
    statusCell.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Rejected';
    row.style.backgroundColor = '#fee2e2';
    setTimeout(() => row.style.backgroundColor = '', 1000);

    try {
        // Reject volunteer
        const volunteerRes = await fetch(`/api/volunteers/${vId}/status?status=REJECTED`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json', [csrfHeaderName]: csrfToken },
        });

        if (!volunteerRes.ok) throw new Error("Failed to reject volunteer");
        console.log("❌ Volunteer rejected");

        // Send message to user
        const msgResult = await sendUserMessage(uId, "Volunteer Rejected", "Admin rejected your volunteer request.");

        if (!msgResult.success) {
            alert("Volunteer rejected but failed to send message: " + msgResult.message);
        } else {
            alert("Volunteer rejected and user notified successfully!");
        }

        window.location.href = "/admin/dashboard";

    } catch (err) {
        console.error("❌ Error in rejection flow:", err);

        // Rollback UI
        statusCell.className = 'status-badge status-pending';
        statusCell.innerHTML = '<i class="fas fa-clock mr-1"></i>Pending';
        buttons.forEach(btn => btn.disabled = false);

        alert("Failed to reject volunteer. Please try again.");
    }
}



async function sendUserMessage(uId, title, content) {
    try {
        const messagePayload = { userId: uId, title, content };

        const res = await fetch("/api/messages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                [csrfHeaderName]: csrfToken,
            },
            body: JSON.stringify(messagePayload)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.warn("⚠️ Message API failed:", errText);
            return { success: false, message: errText };
        }

        const msgText = await res.text(); // plain string response
        console.log("✅ Message sent:", msgText);
        return { success: true, message: msgText };

    } catch (err) {
        console.error("❌ Error sending message:", err);
        return { success: false, message: err.message };
    }
}



function rejectFood(button) {
  const row = button.closest('tr');
  const statusCell = row.querySelector('.status-badge');
  const buttons = row.querySelectorAll('.action-btn');

  buttons.forEach(btn => btn.disabled = true);
  const assignBtn = row.querySelector('.assign-btn');
  if (assignBtn) {
        assignBtn.disabled = true;
  }

  statusCell.className = 'status-badge status-rejected';
  statusCell.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Rejected';

  // Rejection animation
  row.style.backgroundColor = '#fee2e2';
  setTimeout(() => {
      row.style.backgroundColor = '';
  }, 1000);
}






// Initialize DataTable
const table = $('#feedbackTable').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        // Debug incoming request from DataTables
        console.log("🔍 DataTables request object:", data);
        console.log("🚀 Ajax called! Search value:", data.search.value);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "submittedAt";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        let search = data.search.value || "";

        console.log(`📤 Sending request → /all?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&search=${search}`);

        fetch(`/api/feedback/all?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&search=${encodeURIComponent(search)}`)
            .then(res => {
                console.log("✅ Response status:", res.status);
                return res.json();
            })
            .then(json => {
                console.log("📥 Backend response JSON:", json);

                callback({
                    data: json.content,
                    recordsTotal: json.totalElements,
                    recordsFiltered: json.totalElements
                });

                console.log("✅ Data passed to DataTables:", {
                    rows: json.content.length,
                    total: json.totalElements
                });
            })
            .catch(err => console.error("❌ Error fetching data:", err));
    },
    columns: [
        { data: "username", title :'Username' },
        { data: "comment", visible : false},
        { data: "rating" , title : 'Rating'},
        { data: "feedbackType", title : 'Type' },
        { data: "submittedAt" , title : 'Time' }
    ],
    pageLength: 10,          // default rows per page
    lengthMenu: [5, 10, 25, 50],  // user-selectable options
    order: [[4, "desc"]],// default sort: submittedAt descending
    searching : false
});



// ✅ Row click event to open popup
$('#feedbackTable tbody').on('click', 'tr', function () {
    const rowData = table.row(this).data();
    console.log("Row clicked:", rowData); // debug

    // Fill popup with row details
    $('#popupUserId').text(rowData.username);
    $('#popupFeedbackType').text(rowData.feedbackType);
    $('#popupTime').text(rowData.submittedAt);
    $('#popupStars').text("⭐".repeat(rowData.rating)); // quick example
    $('#popupMessage').val(rowData.comment); // show full comment in textarea

    // Show popup
    $('#feedbackPopup').fadeIn();
});

// Close popup
$('.close-popup').on('click', function () {
    $('#feedbackPopup').fadeOut();
});

let feedbackChart = null; // store Chart.js instance globally

function renderFeedbackChart() {
    fetch('/api/feedback/counts')
        .then(res => res.json())
        .then(countsJson => {
            const labels = Object.keys(countsJson);
            const data = Object.values(countsJson);
            const total = data.reduce((a,b)=>a+b,0);

            const colors = ['#6610f2', '#198754', '#fd7e14', '#dc3545', '#0d6efd'];

            // Destroy previous chart if exists
            if (feedbackChart) {
                feedbackChart.destroy();
            }

            const ctx = document.getElementById('feedbackPie').getContext('2d');
            feedbackChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{ data: data, backgroundColor: colors }]
                },
                options: {
                    cutout: '50%',
                    plugins: {
                        legend: { labels: { color: '#000' } },
                        datalabels: {
                            color: '#fff',
                            formatter: (value, context) => ((value/total)*100).toFixed(1) + '%',
                            font: { weight: 'bold', size: 14 }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });

            // Update summary
            const summaryContainer = $('#feedbackSummary');
            summaryContainer.empty();
            labels.forEach((label, index) => {
                const count = data[index];
                const percent = ((count/total)*100).toFixed(1);
                const color = colors[index];
                summaryContainer.append(`
                    <div class="d-flex align-items-center mb-2">
                        <div style="width: 15px; height: 15px; background-color: ${color}; margin-right: 10px; border-radius: 3px;"></div>
                        <div><strong>${label}:</strong> ${count} (${percent}%)</div>
                    </div>
                `);
            });

        })
        .catch(err => console.error(" Error fetching feedback counts:", err));
}


$(document).ready(function() {
    renderFeedbackChart();
});

 // Handle form submission
document.getElementById("eventForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value.trim();
    const location = document.getElementById("eventLocation").value.trim();
    const description = document.getElementById("eventDescription").value.trim();

    // Manual validation
    if (!eventName || !location || !description) {
        alert("⚠️ Please fill in all fields.");
        return;
    }

    const roomPattern = /^Room-\d{3}$/;
    if (!roomPattern.test(location)) {
        alert("⚠️ Location must follow format Room-123");
        return;
    }

    try {

        const userId = currentUser.id;
        if (!userId) {
            alert("❌ Invalid user. Please login again.");
            return;
        }

        // Save event
        const response = await fetch("/api/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [csrfHeaderName]: csrfToken,
            },
            body: JSON.stringify({
                eventName,
                description,
                location,
                userId
            })
        });

        if (response.ok) {
            alert("✅ Event saved successfully!");
            document.getElementById("eventForm").reset();

            // Close modal
            const modalElement = document.getElementById("popupEvent");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            table1.ajax.reload(null, false);
        } else {
            const err = await response.text();
            alert("❌ Failed to save event: " + err);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error saving event!");
    }
});


const table1 = $('#eventTable').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "event_name";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        fetch(`/api/event/all?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
            .then(res => res.json())
            .then(json => {
                callback({
                    data: json.content,
                    recordsTotal: json.totalElements,
                    recordsFiltered: json.totalElements
                });
            })
            .catch(err => console.error("❌ Error fetching data:", err));
    },
    columns: [
        {
            data: "eventName",
            render: function(data) {
                return `
                    <div class="event-cell">
                        <span>${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "location",
            render: function(data) {
                return `
                    <div class="location-cell">
                        <i class="bi bi-geo-alt location-icon"></i>
                        <span>${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "description",
            className: "description",
            render: function(data) {
                return `${data}`;
            }
        },
        {
            data: "userName", // or userId if you’re actually showing the date
            render: function(data) {
                return `
                    <div class="person-cell">
                        <i class="bi bi-person person-icon"></i>
                        <span>${data}</span>
                    </div>
                `;
            }
        },
        {
            data: null, // no data from backend, we create buttons
            orderable: false,
            render: function() {
                return `
                    <span class="icon-button edit-icon"><i class="bi bi-pen-fill"></i></span>
                    <span class="icon-button delete-icon"><i class="bi bi-trash-fill"></i></span>
                `;
            }
        },
        {

            data:"eventId",visible : false
        }
    ],
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    order: [[0, "desc"]], // default sort by submittedAt descending
    searching : false
});


const table2 = $('#VolunteerTable').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "submitted_time";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        fetch(`/api/volunteers/pending?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
            .then(res => res.json())
            .then(json => {
                callback({
                    data: json.content,
                    recordsTotal: json.totalElements,
                    recordsFiltered: json.totalElements
                });
            })
            .catch(err => console.error("❌ Error fetching data:", err));
    },
    columns: [
        {
            data: "fullName",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "telegramUsername",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fab fa-telegram text-blue-500 mr-2"></i>
                        <a href="#" class="telegram-link">${data}</a>
                    </div>
                `;
            }
        },
        {
            data: "currentSemester",
            className:"table-cell user-id",
            render: function(data) {
                return `${data}`;
            }
        },
        {
            data: "preferredRole",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "availability",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "isVolunteer",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="status-badge status-pending">
                                <i class="fas fa-clock mr-1"></i>
                                ${data}
                    </span>
                `;
            }
        },
        {
            data: null, // no data from backend, we create buttons
            orderable: false,
            className:"table-cell",
            render: function(data,type,row) {
                return `
                    <div class="flex items-center">
                        <button class="action-btn approve-btn" onclick="approveVol(${row.volunteer_id},${row.user_id},this)">
                            <i class="fas fa-check text-xs"></i>
                        </button>
                        <button class="action-btn reject-btn" onclick="rejectVol(${row.volunteer_id},${row.user_id},this)">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                `;
            }
        },
        {
             data:"volunteer_id",visible : false
        },
        {
            data:"user_id",visible : false
        }
    ],
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    order: [[2, "desc"]],
    searching : false
});

const table3 = $('#ApprovedTable').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "current_semester";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        fetch(`/api/volunteers/approved?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
            .then(res => res.json())
            .then(json => {
                callback({
                    data: json.content,
                    recordsTotal: json.totalElements,
                    recordsFiltered: json.totalElements
                });
            })
            .catch(err => console.error("❌ Error fetching data:", err));
    },
    columns: [
        {
            data: "fullName",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "telegramUsername",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fab fa-telegram text-blue-500 mr-2"></i>
                        <a href="#" class="telegram-link">${data}</a>
                    </div>
                `;
            }
        },
        {
            data: "currentSemester",
            className:"table-cell user-id",
            render: function(data) {
                return `${data}`;
            }
        },
        {
            data: "preferredRole",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "availability",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
    ],
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    order: [[2, "desc"]],
    searching : false
});


document.querySelector('#eventTable tbody').addEventListener('click', function (e) {
    const editIcon = e.target.closest('.edit-icon');
    if (!editIcon) return;

    const row = editIcon.closest('tr');
    const cells = row.querySelectorAll('td');

    // Make only first 3 columns editable: Event, Location, Description
    for (let i = 0; i < 3; i++) {
      cells[i].setAttribute('contenteditable', 'true');
      cells[i].classList.add('editing-cell');
    }

    // Focus the first editable cell
    cells[0].focus();
    console.log("I am here");
    // Handle saving on Enter
    row.addEventListener('keydown', async function handler(event) {
      if (event.key === 'Enter') {
        event.preventDefault();

        // Grab updated values
        const updatedData = {
            eventName: cells[0].innerText.trim(),
            location: cells[1].innerText.trim(),
            description: cells[2].innerText.trim()
        };

        // Get hidden eventId from last column
        const rowData = table1.row(row).data();
        const eventId = rowData.eventId;
        try {
            // CSRF token


            console.log("🔍 Sending update for Event ID:", eventId, updatedData);

            // Send PATCH request
            const res = await fetch(`/api/event/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    [csrfHeaderName]: csrfToken,
                },
                body: JSON.stringify(updatedData)
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            console.log("✅ Update successful:", data);

            // reload DataTable without resetting pagination
            table1.ajax.reload(null, false);

        } catch (err) {
            console.error("❌ Update failed:", err);
        }

        // Remove editable state
        for (let i = 0; i < 3; i++) {
            cells[i].removeAttribute('contenteditable');
            cells[i].classList.remove('editing-cell');
        }

        // Remove listener to prevent stacking
        row.removeEventListener('keydown', handler);
      }
    });
});

document.querySelector('#eventTable tbody').addEventListener('click', async function (e) {
  const deleteBtn = e.target.closest('.delete-icon');
  if (!deleteBtn) return;

  const confirmed = confirm("Are you sure you want to delete this event?");
  if (!confirmed) return;

  // Get the row and eventId from DataTable
  const row = deleteBtn.closest('tr');
  const rowData = table1.row(row).data(); // Assuming you use DataTables variable 'table1'
  const eventId = rowData.eventId;

  console.log(eventId);
  try {


    // Send DELETE request to backend
    const res = await fetch(`/api/event/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        [csrfHeaderName]: csrfToken,
      }
    });

    if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);

    const data = await res.json();
    console.log("✅ Event deleted:", data);

    // Remove row from DataTable
    table1.row(row).remove().draw(false);

  } catch (err) {
    console.error("❌ Failed to delete event:", err);
    alert("Failed to delete event. Check console for details.");
  }
});



// Use tbody of the table as the static parent
document.querySelector('#eventTable tbody').addEventListener('click', (e) => {
  // Find the nearest ancestor with class 'description' (could be the target itself)
  const descCell = e.target.closest('.description');
  if (descCell) {
    descCell.classList.toggle('full'); // toggle your CSS class
  }
});

//volunteer count
document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/volunteers/count/approved")
        .then(res => res.json())
        .then(count => {
            // target the <div class="text-3xl ..."> inside #VolNum
            document.querySelector("#VolNum .text-3xl").textContent = count;
        })
        .catch(err => console.error("Error loading approved count:", err));
});