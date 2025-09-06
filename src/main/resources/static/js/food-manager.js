let shopImageData = null;
let foodItems = [];
let shopImageFile = null;
let csrfToken = null;
let csrfHeaderName = null;
let shopId = null;

window.addEventListener("DOMContentLoaded", async () => {
      // 1. Fetch CSRF token
      const csrfResponse = await fetch("/csrf-token");
      const csrfData = await csrfResponse.json();
      csrfToken = csrfData.token;
      csrfHeaderName = csrfData.headerName;
      console.log("CSRF Token Loaded:", csrfHeaderName, csrfToken);
});

function handleShopImageUpload(input) {
    const file = input.files[0];
    if (file) {
        shopImageFile = file; // store file globally
        const reader = new FileReader();
        reader.onload = function(e) {
            shopImageData = e.target.result;
            const preview = document.getElementById('shopImagePreview');
            const img = document.getElementById('shopImagePreviewImg');
            img.src = e.target.result;
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function handleFoodImageUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('foodImagePreview');
            const img = document.getElementById('foodImagePreviewImg');
            img.src = e.target.result;
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

async function updateShopInfo() {
    const shopName = document.getElementById('shopName').value.trim();
    const shopDescription = document.getElementById('shopDescription').value.trim();

    if (!shopName) {
        alert('Please enter a shop name');
        return;
    }

    if (!shopImageFile) {
        alert('Please select a shop image');
        return;
    }

    // Build FormData for backend
    const formData = new FormData();
    formData.append("businessName", shopName);
    formData.append("businessDescription", shopDescription);
    formData.append("imageFile", shopImageFile);

    try {
        const response = await fetch("/api/business", {
            method: "POST",
            headers:{[csrfHeaderName]: csrfToken},
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to save business");
        }

        const savedBusiness = await response.json();
        console.log("Saved business:", savedBusiness);

        // Update frontend display
        /*document.getElementById('shopNameDisplay').textContent = savedBusiness.name;
        document.getElementById('shopDescDisplay').textContent = savedBusiness.description;

        const display = document.getElementById('shopImageDisplay');
        display.innerHTML = `<img src="${savedBusiness.imagePath}" alt="Shop Image" class="w-full h-full object-cover rounded-lg">`;


        // Clear form and preview
        document.getElementById('shopName').value = '';
        document.getElementById('shopDescription').value = '';
        document.getElementById('shopImageInput').value = '';
        document.getElementById('shopImagePreview').classList.add('hidden');
        shopImageData = null;
        shopImageFile = null;*/

        alert('Shop information saved successfully!');
        window.location.href = "/protected/food-manager";
    } catch (error) {
        console.error(error);
        alert("Error saving shop info");
    }
}


async function addFoodItem() {
    const foodName = document.getElementById('foodName').value.trim();
    const foodPrice = parseFloat(document.getElementById('foodPrice').value);
    const foodImageInput = document.getElementById('foodImageInput');
    const foodDescription = document.getElementById('foodDescription').value.trim();

    // === Validation ===
    if (!foodName) {
        alert('Please enter a food name');
        return;
    }

    if (!foodPrice || foodPrice <= 0) {
        alert('Please enter a valid price');
        return;
    }

    if (foodPrice > 3500) {
        alert('Price cannot be greater than $3500');
        return;
    }

    if (!foodImageInput.files[0]) {
        alert('Please upload a food image');
        return;
    }

    if (!foodDescription) {
        alert('Please enter a description');
        return;
    }

    // === Prepare FormData ===
    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("foodDescription", foodDescription);
    formData.append("foodPrice", foodPrice);
    formData.append("imageFile", foodImageInput.files[0]);

    try {
        if(shopId == null){
            alert("You haven't set up your business profile yet.Set up your Business");
            clearFoodForm();
            return;
        }

        const response = await fetch(`/api/foods/${shopId}/add`, {
            method: "POST",
            headers:{[csrfHeaderName]: csrfToken},
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to add food item");
        }

        const savedFood = await response.json();

        // Show confirmation
        alert("✅ Food item added successfully!");

        // Optionally update UI list with backend response
        foodItems.push({
            id: savedFood.foodId,
            name: savedFood.foodName,
            price: savedFood.foodPrice,
            image: savedFood.foodImagePath, // backend returns the saved URL
            description: savedFood.foodDescription
        });

        displayFoodItems();
        clearFoodForm();


    } catch (error) {
        console.error("Error adding food:", error);
        alert("❌ Something went wrong while adding the food item.");
    }
}


function displayFoodItems() {
    const container = document.getElementById('foodItemsList');

    if (foodItems.length === 0) {
        container.innerHTML =
            '<div class="text-center text-gray-500 py-8 col-span-full">No food items added yet. Add your first item above!</div>';
        return;
    }

    container.innerHTML = foodItems.map(item => `
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-lg mb-3">
            <h3 class="font-semibold text-gray-800 mb-1">${item.name}</h3>
            <p class="text-gray-600 text-sm mb-2">${item.description}</p>
            <p class="text-green-600 font-bold">$${parseFloat(item.price).toFixed(2)}</p>
            <button onclick="removeFoodItem(${item.id})" class="mt-2 text-red-500 hover:text-red-700 text-sm">Remove</button>
        </div>
    `).join('');
}



async function removeFoodItem(id) {
    if (confirm('Are you sure you want to remove this item?')) {
        try {
            const response = await fetch(`/api/foods/${id}`, {
                method: 'DELETE',
                headers:{[csrfHeaderName]: csrfToken}
            });

            if (response.ok) {
                // ✅ Remove from frontend list if backend deletion succeeds
                foodItems = foodItems.filter(item => item.id !== id);
                displayFoodItems();
                alert('Food item deleted successfully');
            } else {
                const errorMessage = await response.text();
                alert('Failed to delete food: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error deleting food:', error);
            alert('An error occurred while deleting the food');
        }
    }
}

function clearFoodForm() {
    document.getElementById('foodName').value = '';
    document.getElementById('foodPrice').value = '';
    document.getElementById('foodImageInput').value = '';
    document.getElementById('foodImagePreview').classList.add('hidden');
    document.getElementById('foodDescription').value = ''; // new: Clear description field
}

// Price validation on input
document.getElementById('foodPrice').addEventListener('input', function() {
    const value = parseFloat(this.value);
    if (value > 3500) {
        this.setCustomValidity('Price cannot exceed $3500');
        this.style.borderColor = '#ef4444';
    } else {
        this.setCustomValidity('');
        this.style.borderColor = '#d1d5db';
    }
});


async function loadMyBusiness() {
    try {
        const response = await fetch("/api/business/me", {
            method: "GET",
            headers: { [csrfHeaderName]: csrfToken } // only if CSRF is enabled
        });

        if (!response.ok) {
            console.warn("No business found for current user");
            return;
        }

        const business = await response.json();


        // ✅ Update Shop Display
        document.getElementById('shopNameDisplay').textContent = business.name || "Shop Name Not Set";
        document.getElementById('shopDescDisplay').textContent = business.description || "Shop description not provided yet.";

        const display = document.getElementById('shopImageDisplay');
        if (business.imagePath) {
            display.innerHTML = `<img src="${business.imagePath}" alt="Shop Image" class="w-full h-full object-cover rounded-lg">`;
        } else {
            display.innerHTML = `<span class="text-gray-400 text-sm text-center">No Image<br>Uploaded</span>`;
        }

        return business.id;

    } catch (error) {
        console.error("Error loading business:", error);
        return null;
    }
}

async function loadFoods(shopId) {
    try {
        const response = await fetch(`/api/foods/shop/${shopId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch foods");
        }

        const foods = await response.json();

        // Replace existing items with backend data
        foodItems = foods.map(f => ({
            id: f.foodId,
            name: f.foodName,
            price: f.foodPrice,
            image: f.foodImagePath,
            description: f.foodDescription,
        }));

        displayFoodItems();

    } catch (error) {
        console.error("Error loading foods:", error);
        document.getElementById("foodItemsList").innerHTML =
            '<div class="text-center text-red-500 py-8 col-span-full">Error loading foods. Please try again later.</div>';
    }
}

// Call on page load
document.addEventListener("DOMContentLoaded", async () => {
    shopId = await loadMyBusiness(); // wait until loaded
    if (shopId) {
        await loadFoods(shopId); // only call if business exists
        initializeOrderTable(shopId);
    } else {
        console.warn("No shop found, skipping food load.");
    }
});

function initializeOrderTable(shopId) {
    $('#OrderTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: function(data, callback) {
            const page = Math.floor(data.start / data.length);
            const size = data.length;

            let sortBy = "orderId";
            let direction = "desc";
            if (data.order && data.order.length > 0) {
                sortBy = data.columns[data.order[0].column].data;
                direction = data.order[0].dir;
            }

            fetch(`/api/orders/unmarked?shopId=${shopId}&page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`)
                .then(res => res.json())
                .then(json => {
                    callback({
                        data: json.content,
                        recordsTotal: json.totalElements,
                        recordsFiltered: json.totalElements
                    });
                });
        },
        columns: [
            {
                data: "orderId",
                className:"table-cell",
                render: function(data) {
                    return `
                        <span class="user-id">#${data}</span>
                    `;
                }
            },
            {
                data: "userId",
                className:"table-cell",
                render: function(data) {
                    return `<span class="user-id">#${data}</span>`;
                }
            },
            {
            data: "items",  // <-- your items array from backend
                className: "table-cell",
                orderable:false,
                render: function(items) {
                    // join each item's quantity and name
                    return items.map(item => `${item.quantity}× ${item.foodName}`).join(', ');
                }
            },
            {
                data: "totalAmount",
                className:"table-cell",
                render: function(data) {
                    return `<span class="price">${data}</span>`;
                }
            },
            {
                data: null, // no data from backend, we create buttons
                className:"table-cell",
                orderable:false,
                render: function(data) {
                    return `
                        <div class="flex items-center">
                            <button class="action-btn approve-btn" onclick="markOrder(${data.orderId}, this)">
                                <i class="fas fa-check text-xs"></i>
                            </button>
                        </div>
                    `;
                }
            },
        ],
        pageLength: 10,
        order: [[0, "desc"]],
        lengthMenu: [5, 10, 25, 50],
        searching : false
    });
}

async function markOrder(orderId, btnElement) {
    if (!confirm(`Mark order #${orderId} as prepared?`)) return;

    try {
        // Disable all buttons in the row and highlight
        const row = btnElement.closest('tr');
        const buttons = row.querySelectorAll('.action-btn');
        buttons.forEach(btn => btn.disabled = true);
        row.style.backgroundColor = '#d1fae5';
        setTimeout(() => row.style.backgroundColor = '', 1000);

        // Call backend
        const res = await fetch(`/api/orders/mark/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                [csrfHeaderName]: csrfToken
            }
        });

        if (!res.ok) throw new Error('Failed to mark order');

        // Remove row from DataTable
        $('#OrderTable').DataTable().ajax.reload(null, false);

    } catch (err) {
        console.error(err);
        alert('Error marking order. Please try again.');
    }
}
