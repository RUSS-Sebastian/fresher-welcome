const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const feedbackCard = document.getElementById('feedbackCard');
const content_area = document.querySelector('.content-area');
const eventCard = document.getElementById('EventCard');
const foodCard = document.getElementById('FoodCard');
const vCard = document.getElementById('VolCard');
const vNum = document.getElementById('VolNum');
const pNum = document.getElementById('perNum');
const foodNum = document.getElementById('foodNum');
const approvedVCard = document.getElementById('ApprovedCard');
const approvedVCard2 = document.getElementById('ApprovedCard2');
const approvedVCard3 = document.getElementById('ApprovedCard3');
const shop = document.getElementById('Shop');
const candidate = document.getElementById('Candidate');
let formStates = {
    volunteerFormContainer: false, // closed initially
    activityFormContainer: false,
    sellerFormContainer: false,
    voteFormContainer:false
};
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

    content_area.style.left = Left;
    content_area.style.width = contentWidth;

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
            pNum.style.display = "none";
            approvedVCard.style.display = "none";
            approvedVCard2.style.display = "none";
            approvedVCard3.style.display = "none";
            shop.style.display = "none";
            foodNum.style.display = "none";
            candidate.style.display = "none";

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
          pNum.style.display = "none";
          approvedVCard2.style.display = "none";
          shop.style.display = "none";
          foodNum.style.display = "none";
          approvedVCard3.style.display = "none";
          candidate.style.display = "none";

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
            pNum.style.display = "none";
            approvedVCard2.style.display = "none";
            shop.style.display = "none";
            foodNum.style.display = "none";
            approvedVCard3.style.display = "none";
            candidate.style.display = "none";

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
            pNum.style.display = "none";
            approvedVCard2.style.display = "none";
            shop.style.display = "none";
            foodNum.style.display = "none";
            approvedVCard3.style.display = "none";
            candidate.style.display = "none";

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
            pNum.style.display = "none";
            approvedVCard2.style.display = "none";
            shop.style.display = "none";
            foodNum.style.display = "none";
            approvedVCard3.style.display = "none";
            candidate.style.display = "none";

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
          pNum.style.display = "block";
          approvedVCard2.style.display = "block";
          shop.style.display = "none";
          foodNum.style.display = "none";
          approvedVCard3.style.display = "none";
          candidate.style.display = "none";

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
          pNum.style.display = "none";
          approvedVCard2.style.display = "none";
          shop.style.display = "none";
          approvedVCard3.style.display = "block";
          foodNum.style.display = "block";
          candidate.style.display = "none";

        }else if(text == "Candidate Management"){
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
            pNum.style.display = "none";
            approvedVCard2.style.display = "none";
            shop.style.display = "none";
            foodNum.style.display = "none";
            approvedVCard3.style.display = "none";
            candidate.style.display = "block";
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
            pNum.style.display = "none";
            approvedVCard2.style.display = "none";
            shop.style.display = "block";
            foodNum.style.display = "none";
            approvedVCard3.style.display = "none";
            candidate.style.display = "none";
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


function updateUI(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
            console.error(`❌ Container with id '${containerId}' not found`);
            return;
    }
    const toggleSwitch = container.querySelector('.toggleSwitch');
    const statusEmoji = container.querySelector('.statusEmoji');
    const statusText = container.querySelector('.statusText');
    const statusSubtext = container.querySelector('.statusSubtext');
    const actionButton = container.querySelector('.actionButton');
    const statusDisplay = container.querySelector('.statusDisplay');

    const formIsOpen = formStates[containerId];

    // Add fade effect
    statusDisplay.classList.add('fade-in');
    setTimeout(() => statusDisplay.classList.remove('fade-in'), 500);
    let openMessage = "";
    let closedMessage = "";

    switch (containerId) {
        case "volunteerFormContainer":
            openMessage = "Volunteers can submit applications";
            closedMessage = "Volunteers cannot submit applications";
            break;

        case "activityFormContainer":
            openMessage = "Activities can be registered";
            closedMessage = "Activities cannot be registered";
            break;

        case "sellerFormContainer":
            openMessage = "Sellers can apply for stalls";
            closedMessage = "Sellers cannot apply for stalls";
            break;

        case "voteFormContainer":
            openMessage = "Users can vote king and queens";
            closedMessage = "Users can't vote king and queens";
            break;

        default:
            openMessage = "Form is available";
            closedMessage = "Form is unavailable";
    }

    if (formIsOpen) {
        // Form is open
        toggleSwitch.classList.add("active");
        statusEmoji.textContent = "🟢";
        statusText.textContent = "Form Open";
        statusSubtext.textContent = openMessage;
        actionButton.textContent = "Close Form";
        actionButton.classList.remove("bg-green-600", "hover:bg-green-700");
        actionButton.classList.add("bg-red-600", "hover:bg-red-700");
    } else {
        // Form is closed
        toggleSwitch.classList.remove("active");
        statusEmoji.textContent = "🔴";
        statusText.textContent = "Form Closed";
        statusSubtext.textContent = closedMessage;
        actionButton.textContent = "Open Form";
        actionButton.classList.remove("bg-red-600", "hover:bg-red-700");
        actionButton.classList.add("bg-green-600", "hover:bg-green-700");
    }
}




document.addEventListener("DOMContentLoaded", async () => {
    const buttons = [
        { containerId: "volunteerFormContainer", buttonName: "volunteer_form_button" },
        { containerId: "activityFormContainer", buttonName: "activity_form_button" },
        {containerId: "sellerFormContainer", buttonName:"seller_form_button"},
        {containerId:"voteFormContainer",buttonName:"vote_button"}

    ];

    for (const { containerId, buttonName } of buttons) {
        try {
            const response = await fetch(`/api/admin-buttons/${buttonName}`);
            if (!response.ok) throw new Error(`Failed to fetch ${buttonName}`);

            // true/false from backend
            const isOpen = await response.json();
            formStates[containerId] = isOpen;

            // update the right container
            updateUI(containerId);
        } catch (error) {
            console.error(`Error fetching status for ${buttonName}:`, error);
        }
    }
});


async function toggleForm(containerId, buttonName) {
    // toggle this container's state
    formStates[containerId] = !formStates[containerId];
    updateUI(containerId);

    try {
        await fetch(`/api/admin-buttons/${buttonName}?status=${formStates[containerId]}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [csrfHeaderName]: csrfToken,
            }
        });
    } catch (err) {
        console.error(`Error updating button for ${buttonName}:`, err);
    }
}


function confirmAction(containerId, buttonName) {
    const isOpen = formStates[containerId];
    const action = isOpen ? 'close' : 'open';

    if (confirm(`Are you sure you want to ${action} this form?`)) {
        toggleForm(containerId, buttonName);
    }
}


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

async function approveActivity(pId, uId, button) {
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

        const performanceRes = await fetch(`/api/performances/${pId}/status?status=APPROVED`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json', [csrfHeaderName]: csrfToken },
        });

        if (!performanceRes.ok) throw new Error("Failed to approve performance");

        console.log("✅ Performance approved");

        // Send message separately
        const msgResult = await sendUserMessage(uId, "Approved Performance", "Admin approved your performance request successfully.");

        if (!msgResult.success) {
            alert("Performance approved but failed to send message: " + msgResult.message);
        } else {
            alert("Performance approved and user notified successfully!");
        }

        // Reload data from server and redraw the table
        table4.ajax.reload(null, false);
        table5.ajax.reload(null,false);
        loadApprovedCount();


    } catch (err) {
        console.error("❌ Error in approval flow:", err);

        // Rollback UI
        statusCell.className = 'status-badge status-pending';
        statusCell.innerHTML = '<i class="fas fa-clock mr-1"></i>Pending';
        buttons.forEach(btn => btn.disabled = false);

        alert("Failed to approve performance. Please try again.");
    }
}

async function rejectActivity(pId, uId, button) {
    console.log("Reject clicked for pId:", pId);

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
        // Reject performance
        const performanceRes = await fetch(`/api/performances/${pId}/status?status=REJECTED`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json', [csrfHeaderName]: csrfToken },
        });

        if (!performanceRes.ok) throw new Error("Failed to reject performance");
        console.log("❌ Performance rejected");

        // Send message to user
        const msgResult = await sendUserMessage(uId, "Performance Rejected", "Admin rejected your performance request.");

        if (!msgResult.success) {
            alert("Performance rejected but failed to send message: " + msgResult.message);
        } else {
            alert("Performance rejected and user notified successfully!");
        }

        // Reload data from server and redraw the table
        table4.ajax.reload(null, false);


    } catch (err) {
        console.error("❌ Error in rejection flow:", err);

        // Rollback UI
        statusCell.className = 'status-badge status-pending';
        statusCell.innerHTML = '<i class="fas fa-clock mr-1"></i>Pending';
        buttons.forEach(btn => btn.disabled = false);

        alert("Failed to reject performance. Please try again.");
    }
}


function toggleDropdown(button) {
    const dropdown = button.nextElementSibling;
    const allDropdowns = document.querySelectorAll('.dropdown');

    // Close all other dropdowns
    allDropdowns.forEach(d => {
        if (d !== dropdown) d.style.display = 'none';
    });

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';

        // Fetch latest available shops when dropdown is opened
        fetch(`/api/shops/available`)
            .then(res => res.json())
            .then(shops => {
                dropdown.innerHTML = ""; // clear old list
                if (shops.length === 0) {
                    dropdown.innerHTML = `<div class="dropdown-item text-gray-400">No locations available</div>`;
                    return;
                }
                shops.forEach(shop => {
                    const item = document.createElement("div");
                    item.className = "dropdown-item";
                    item.textContent = shop.shopName;
                    item.onclick = () => assignLocation(item, shop.shopName, shop.shopId);
                    dropdown.appendChild(item);
                });
            })
            .catch(err => console.error("❌ Error fetching shops:", err));
    }
}

function assignLocation(item, location, shopId) {
    const row = item.closest('tr');
    const assignedLocationCell = row.querySelector('.assigned-location');
    const dropdown = item.closest('.dropdown');

    // Update assigned location
    assignedLocationCell.textContent = location;
    assignedLocationCell.setAttribute('data-assigned', location);
    assignedLocationCell.setAttribute('data-shop-id', shopId);
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

async function approveFood(button) {
    try {
        const row = button.closest('tr');
        const table = $('#foodTable').DataTable();
        const rowData = table.row(row).data(); // get full row data
        const statusCell = row.querySelector('.status-badge');
        const buttons = row.querySelectorAll('.action-btn');

        // Disable action buttons
        buttons.forEach(btn => btn.disabled = true);

        // Disable the "Assign Location" button
        const assignBtn = row.querySelector('.assign-btn');
        if (assignBtn) assignBtn.disabled = true;

        // Get shopId: assigned first, fallback to original from rowData
        const assignedLocationCell = row.querySelector('.assigned-location');
        const shopId = assignedLocationCell.getAttribute('data-shop-id') || rowData.shop_id;
        const userId = rowData.user_id;

        const formId = rowData.form_id;

        // Update status visually
        statusCell.className = 'status-badge status-approved';
        statusCell.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Approved';

        // Success animation
        row.style.backgroundColor = '#d1fae5';
        setTimeout(() => {
            row.style.backgroundColor = '';
        }, 1000);

        // Send PATCH request to backend
        const response = await fetch(`/api/food-sellers/${formId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                [csrfHeaderName]: csrfToken
            },
            body: JSON.stringify({
                shopId: Number(shopId),
                status: 'APPROVED'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Updated:', data);

        // Send message separately
        const msgResult = await sendUserMessage(userId, "Approved food selling", "Admin approved your food selling request successfully.");

        if (!msgResult.success) {
            alert("Food selling approved but failed to send message: " + msgResult.message);
        } else {
            alert("Food selling  approved and user notified successfully!");
        }

        // Reload data from server and redraw the table
        table6.ajax.reload(null, false);
        loadApprovedSellerCount();
        table7.ajax.reload(null,false);

    } catch (err) {
        console.error('Error approving seller:', err);
        alert('Failed to approve seller. Please try again.');
    }
}

async function rejectFood(button) {
    try {
        const row = button.closest('tr');
        const table = $('#foodTable').DataTable();
        const rowData = table.row(row).data(); // get full row data
        const statusCell = row.querySelector('.status-badge');
        const buttons = row.querySelectorAll('.action-btn');

        // Disable action buttons
        buttons.forEach(btn => btn.disabled = true);

        // Disable the "Assign Location" button
        const assignBtn = row.querySelector('.assign-btn');
        if (assignBtn) assignBtn.disabled = true;

        // Get shopId: assigned first, fallback to original from rowData
        const assignedLocationCell = row.querySelector('.assigned-location');
        const shopId = assignedLocationCell.getAttribute('data-shop-id') || rowData.shop_id;
        const userId = rowData.user_id;

        const formId = rowData.form_id;

        // Update status visually
        statusCell.className = 'status-badge status-rejected';
        statusCell.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Rejected';

        // Success animation
        row.style.backgroundColor = '#fee2e2';
        setTimeout(() => {
          row.style.backgroundColor = '';
        }, 1000);

        // Send PATCH request to backend
        const response = await fetch(`/api/food-sellers/${formId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                [csrfHeaderName]: csrfToken
            },
            body: JSON.stringify({
                shopId: Number(shopId),
                status: 'REJECTED'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Updated:', data);

        // Send message separately
        const msgResult = await sendUserMessage(userId, "Rejected food selling", "Admin rejected your food selling request sorry.");

        if (!msgResult.success) {
            alert("Food selling rejected but failed to send message: " + msgResult.message);
        } else {
            alert("Food selling  rejected and user notified successfully!");
        }

        // Reload data from server and redraw the table
        table6.ajax.reload(null, false);

    } catch (err) {
        console.error('Error rejecting seller:', err);
        alert('Failed to reject seller. Please try again.');
    }
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

        table2.ajax.reload(null,false);
        table3.ajax.reload(null, false);
        loadApprovedVolCount();

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

        table2.ajax.reload(null,false);

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
    ordering: false,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        fetch(`/api/volunteers/pending?page=${page}&size=${size}&sortBy=submittedTime&direction=desc`)
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
    searching : false
});

const table3 = $('#ApprovedTable').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "fullName";
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
    order: [[0, "desc"]],
    lengthMenu: [5, 10, 25, 50],
    searching : false
});

const table4 = $('#activityTable').DataTable({
    processing: true,
    serverSide: true,
    ordering: false,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        fetch(`/api/performances/pending?page=${page}&size=${size}&sortBy=submittedTime&direction=desc`)
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
            data: "userId",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="user-id">#${data}</span>
                `;
            }
        },
        {
            data: "activityName",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-900">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "duration",
            className:"table-cell",
            render: function(data) {
                return `<span class="duration">${data}</span>`;
            }
        },
        {
            data: "numberOfMembers",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fas fa-users text-gray-400 mr-2"></i>
                        <span class="font-medium text-gray-900">${data}</span>
                    </div>
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
            data: "activityDescription",
            className:"table-cell",
            render: function(data) {
                return `
                    <p class="description text-sm">${data}</p>
                `;
            }
        },
        {
            data:"status",
            className:"table-cell",
            render: function(data){
                return `
                    <span class="status-badge status-pending">
                        <i class="fas fa-clock mr-1"></i>
                        ${data}
                    </span>
                `
            }
        },
        {
            data: null, // no data from backend, we create buttons
            orderable: false,
            className:"table-cell",
            render: function(data,type,row) {
                return `
                    <div class="flex items-center">
                        <button class="action-btn approve-btn" onclick="approveActivity(${row.pId},${row.userId},this)">
                            <i class="fas fa-check text-xs"></i>
                        </button>
                        <button class="action-btn reject-btn" onclick="rejectActivity(${row.pId},${row.userId},this)">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                `;
            }
        },
        {
             data:"pId",visible : false
        },
    ],
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    searching : false
});

const table5 = $('#ApprovedTable2').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "userId";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        fetch(`/api/performances/approved?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
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
            data: "userId",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="user-id">#${data}</span>
                `;
            }
        },
        {
            data: "activityName",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-900">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "duration",
            orderable:false,
            className:"table-cell user-id",
            render: function(data) {
                return `<span class="duration">${data}</span>`;
            }
        },
        {
            data: "numberOfMembers",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fas fa-users text-gray-400 mr-2"></i>
                        <span class="font-medium text-gray-900">${data}</span>
                    </div>
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
            data: "activityDescription",
            className:"table-cell",
            render: function(data) {
                return `
                    <p class="description text-sm">${data}</p>
                `;
            }
        }
    ],
    pageLength: 10,
    order: [[0, "desc"]],
    lengthMenu: [5, 10, 25, 50],
    searching : false
});

const table6 = $('#foodTable').DataTable({
    processing: true,
    serverSide: true,
    ordering: false,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        fetch(`/api/food-sellers/pending?page=${page}&size=${size}&sortBy=submittedTime&direction=desc`)
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
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fas fa-graduation-cap text-gray-400 mr-2"></i>
                        <span class="font-medium text-gray-900">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "foodName",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-900">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "price",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="price">${data}</span>
                `;
            }
        },
        {
            data: "preferredLocation",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>
                        <span class="text-gray-700">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "foodSet",
            className: "table-cell",
            render: function(data) {
                    const value = data; // convert anything truthy/falsy to true/false
                    return value
                        ? `<span class="food-set-badge food-set-true">
                               <i class="fas fa-check mr-1"></i>Yes
                           </span>`
                        : `<span class="food-set-badge food-set-false">
                               <i class="fas fa-times mr-1"></i>No
                           </span>`;
            }
        },
        {
            data: "foodDescription", // no data from backend, we create buttons
            className:"table-cell",
            render: function(data) {
                return `
                    <p class="text-sm description">${data}</p>
                `;
            }
        },
        {
            data: null, // no data from backend, we create buttons
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="assigned-location assigned-none" data-assigned="None">None</span>
                `;
            }
        },
        {
            data: null, // no data from backend, we create buttons
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="relative">
                        <button class="assign-btn" onclick="toggleDropdown(this)">
                            Assign Location
                            <i class="fas fa-chevron-down ml-2 text-xs"></i>
                        </button>
                        <div class="dropdown">

                        </div>
                    </div>
                `;
            }
        },
        {
            data:"status",
            className:"table-cell",
            render: function(data){
                return `
                    <span class="status-badge status-pending">
                        <i class="fas fa-clock mr-1"></i>
                        ${data}
                    </span>
                `
            }
        },
        {
            data: null, // no data from backend, we create buttons
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <button class="action-btn approve-btn" onclick="approveFood(this)">
                            <i class="fas fa-check text-xs"></i>
                        </button>
                        <button class="action-btn reject-btn" onclick="rejectFood(this)">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                `;
            }
        },
        {
             data:"shop_id",visible : false
        },
        {
            data:"form_id",visible : false
        },
        {
            data:"user_id",visible : false
        }
    ],
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    searching : false
});

const table7 = $('#ApprovedTable3').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "foodName";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        fetch(`/api/food-sellers/approved?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
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
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fas fa-graduation-cap text-gray-400 mr-2"></i>
                        <span class="font-medium text-gray-900">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "foodName",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <span class="font-semibold text-gray-900">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "price",
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="price">${data}</span>
                `;
            }
        },
        {
            data: "preferredLocation",
            className:"table-cell",
            render: function(data) {
                return `
                    <div class="flex items-center">
                        <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>
                        <span class="text-gray-700">${data}</span>
                    </div>
                `;
            }
        },
        {
            data: "foodSet",
            className: "table-cell",
            orderable: false,
            render: function(data) {
                    const value = data; // convert anything truthy/falsy to true/false
                    return value
                        ? `<span class="food-set-badge food-set-true">
                               <i class="fas fa-check mr-1"></i>Yes
                           </span>`
                        : `<span class="food-set-badge food-set-false">
                               <i class="fas fa-times mr-1"></i>No
                           </span>`;
            }
        },
        {
            data: "foodDescription", // no data from backend, we create buttons
            className:"table-cell",
            render: function(data) {
                return `
                    <p class="text-sm description">${data}</p>
                `;
            }
        },
    ],
    pageLength: 10,
    order: [[2, "desc"]],
    lengthMenu: [5, 10, 25, 50],
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

document.querySelector('#activityTable tbody').addEventListener('click', (e) => {
  // Find the nearest ancestor with class 'description' (could be the target itself)
  const descCell = e.target.closest('.description');
  if (descCell) {
    descCell.classList.toggle('full'); // toggle your CSS class
  }
});

document.querySelector('#ApprovedTable2 tbody').addEventListener('click', (e) => {
  // Find the nearest ancestor with class 'description' (could be the target itself)
  const descCell = e.target.closest('.description');
  if (descCell) {
    descCell.classList.toggle('full'); // toggle your CSS class
  }
});

document.querySelector('#ApprovedTable3 tbody').addEventListener('click', (e) => {
  // Find the nearest ancestor with class 'description' (could be the target itself)
  const descCell = e.target.closest('.description');
  if (descCell) {
    descCell.classList.toggle('full'); // toggle your CSS class
  }
});

document.querySelector('#foodTable tbody').addEventListener('click', (e) => {
  // Find the nearest ancestor with class 'description' (could be the target itself)
  const descCell = e.target.closest('.description');
  if (descCell) {
    descCell.classList.toggle('full'); // toggle your CSS class
  }
});
//counts
document.addEventListener("DOMContentLoaded", () => {
    loadApprovedVolCount();
    loadApprovedSellerCount();
    loadApprovedCount();
});

function loadApprovedVolCount(){
    fetch("/api/volunteers/count/approved")
        .then(res => res.json())
        .then(count => {
            // target the <div class="text-3xl ..."> inside #VolNum
            document.querySelector("#VolNum .text-3xl").textContent = count;
        })
        .catch(err => console.error("Error loading approved count:", err));
}

function loadApprovedCount() {
    fetch("/api/performances/count/approved")
        .then(res => res.json())
        .then(count => {
            const target = document.querySelector("#perNum .text-3xl");
            if (target) target.textContent = count;
        })
        .catch(err => console.error("Error loading approved count:", err));
}

function loadApprovedSellerCount() {
    fetch("/api/food-sellers/count/approved")
        .then(res => res.json())
        .then(count => {
            const target = document.querySelector("#foodNum .text-3xl");
            if (target) target.textContent = count;
        })
        .catch(err => console.error("Error loading approved count:", err));
}

const uploadButton = document.getElementById('uploadButton');
const uploadForm = document.getElementById('uploadForm');
const closeForm = document.getElementById('closeForm');
const cancelForm = document.getElementById('cancelForm');
const shopForm = document.getElementById('shopForm');
const shopImage = document.getElementById('shopImage');
const uploadArea = document.getElementById('uploadArea');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const fileName = document.getElementById('fileName');
const successMessage = document.getElementById('successMessage');
const uploadAnother = document.getElementById('uploadAnother');
const uploadButtonContainer = document.getElementById('uploadButtonContainer');

// Show form when upload button is clicked
uploadButton.addEventListener('click', () => {
    uploadForm.classList.remove('hidden');
    uploadButtonContainer.classList.add('hidden');
});

// Hide form when close or cancel is clicked
function hideForm() {
    uploadForm.classList.add('hidden');
    uploadButtonContainer.classList.remove('hidden');
    shopForm.reset();
    imagePreview.classList.add('hidden');
    uploadArea.classList.remove('hidden');
}

closeForm.addEventListener('click', hideForm);
cancelForm.addEventListener('click', hideForm);

// Handle file upload area click
uploadArea.addEventListener('click', () => {
    shopImage.click();
});

// Handle file selection
shopImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.match('image/jpeg')) {
            alert('Please select a JPEG image file only.');
            shopImage.value = '';
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            fileName.textContent = file.name;
            uploadArea.classList.add('hidden');
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission
shopForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const shopName = document.getElementById('shopName').value;
    const imageFile = shopImage.files[0];

    if (shopName && imageFile) {
        const formData = new FormData();
        formData.append("shopName", shopName);
        formData.append("imageFile", imageFile);

        try {
            const response = await fetch("/api/shops", {
                method: "POST",
                headers: {
                    [csrfHeaderName]: csrfToken,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Shop saved:", data);

                uploadForm.classList.add('hidden');
                successMessage.classList.remove('hidden');

                shopForm.reset();
                imagePreview.classList.add('hidden');
                uploadArea.classList.remove('hidden');
            } else {
                alert("Upload failed!");
            }
        } catch (err) {
            console.error("Error uploading shop:", err);
        }
    }
});

// Handle upload another button
uploadAnother.addEventListener('click', () => {
    successMessage.classList.add('hidden');
    uploadButtonContainer.classList.remove('hidden');
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-indigo-400');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-indigo-400');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-indigo-400');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.match('image/jpeg')) {
            shopImage.files = files;
            shopImage.dispatchEvent(new Event('change'));
        } else {
            alert('Please select a JPEG image file only.');
        }
    }
});


const uploadButton1 = document.getElementById('uploadButton1');
const uploadForm1 = document.getElementById('uploadForm1');
const closeForm1 = document.getElementById('closeForm1');
const cancelForm1 = document.getElementById('cancelForm1');
const candidateForm = document.getElementById('candidateForm');
const candidateImage = document.getElementById('candidateImage');
const uploadArea1 = document.getElementById('uploadArea1');
const imagePreview1 = document.getElementById('imagePreview1');
const previewImg1 = document.getElementById('previewImg1');
const fileName1 = document.getElementById('fileName1');
const successMessage1 = document.getElementById('successMessage1');
const uploadAnother1 = document.getElementById('uploadAnother1');
const uploadButtonContainer1 = document.getElementById('uploadButtonContainer1');
const candidateNameInput = document.getElementById('candidateName');
const candidateTypeSelect = document.getElementById('candidateType');


// Show the upload form
uploadButton1.addEventListener('click', () => {
    uploadForm1.classList.remove('hidden');
    uploadButtonContainer1.classList.add('hidden');
});

// Hide form when close or cancel is clicked
function hideCandidateForm() {
    uploadForm1.classList.add('hidden');
    uploadButtonContainer1.classList.remove('hidden');
    candidateForm.reset();
    imagePreview1.classList.add('hidden');
    uploadArea1.classList.remove('hidden');
}

closeForm1.addEventListener('click', hideCandidateForm);
cancelForm1.addEventListener('click', hideCandidateForm);

// Handle file upload area click
uploadArea1.addEventListener('click', () => {
    candidateImage.click();
});

// Handle file selection for candidate image
candidateImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.match('image/jpeg')) {
            alert('Please select a JPEG image file only.');
            candidateImage.value = '';
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg1.src = e.target.result;
            fileName1.textContent = file.name;
            uploadArea1.classList.add('hidden');
            imagePreview1.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

candidateForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent normal form submit

    // Validate inputs (optional, already required in HTML)
    const name = candidateNameInput.value.trim();
    const category = candidateTypeSelect.value;
    const imageFile = candidateImage.files[0];

    if (!name || !category || !imageFile) {
        alert('Please fill all required fields.');
        return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('imageFile', imageFile);

    try {
        const response = await fetch('/api/candidates/save', {
            method: 'POST',
            headers: {
                [csrfHeaderName]: csrfToken,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to save candidate.');
        }

        const savedCandidate = await response.json();
        console.log('Candidate saved:', savedCandidate);

        // Show success message
        uploadForm1.classList.add('hidden');
        successMessage1.classList.remove('hidden');
        candidateForm.reset();
        imagePreview1.classList.add('hidden');
        uploadArea1.classList.remove('hidden');

    } catch (err) {
        console.error(err);
        alert('Error saving candidate. Please try again.');
    }
});

// Handle upload another button
uploadAnother1.addEventListener('click', () => {
    successMessage1.classList.add('hidden');
    uploadButtonContainer1.classList.remove('hidden');
});

// Drag and drop functionality
uploadArea1.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea1.classList.add('border-indigo-400');
});

uploadArea1.addEventListener('dragleave', () => {
    uploadArea1.classList.remove('border-indigo-400');
});

uploadArea1.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea1.classList.remove('border-indigo-400');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.match('image/jpeg')) {
            candidateImage.files = files;
            candidateImage.dispatchEvent(new Event('change'));
        } else {
            alert('Please select a JPEG image file only.');
        }
    }
});


const table8 = $('#voteTable').DataTable({
    processing: true,
    serverSide: true,
    ajax: function(data, callback) {
        console.log("🔍 DataTables request object:", data);

        const page = Math.floor(data.start / data.length);
        const size = data.length;

        let sortBy = "tnt";
        let direction = "desc";
        if (data.order && data.order.length > 0) {
            sortBy = data.columns[data.order[0].column].data;
            direction = data.order[0].dir;
        }

        fetch(`/api/votes/voters?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
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
            data: "tnt",
            orderable:false,
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "kingName",
            orderable:false,
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
        {
            data: "queenName",
            orderable:false,
            className:"table-cell",
            render: function(data) {
                return `
                    <span class="font-semibold text-gray-900">${data}</span>
                `;
            }
        },
    ],
    order: [[0, "desc"]],
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    searching : false
});