// Sample bills data (in a real application, this would come from a backend)
const billsData = [
    {
        billNo: "INV-001234",
        guestName: "John Smith",
        roomNo: "301",
        checkIn: "2025-09-25",
        checkOut: "2025-09-28",
        amount: 850,
        status: "paid"
    },
    {
        billNo: "INV-001235",
        guestName: "Emma Wilson",
        roomNo: "405",
        checkIn: "2025-09-26",
        checkOut: "2025-09-29",
        amount: 1200,
        status: "pending"
    },
    {
        billNo: "INV-001236",
        guestName: "Michael Brown",
        roomNo: "202",
        checkIn: "2025-09-27",
        checkOut: "2025-09-30",
        amount: 650,
        status: "cancelled"
    }
];

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Populate bills table
function populateBillsTable(bills = billsData) {
    const tableBody = document.getElementById('billsTableBody');
    tableBody.innerHTML = '';

    bills.forEach(bill => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bill.billNo}</td>
            <td>${bill.guestName}</td>
            <td>${bill.roomNo}</td>
            <td>${formatDate(bill.checkIn)}</td>
            <td>${formatDate(bill.checkOut)}</td>
            <td>${formatCurrency(bill.amount)}</td>
            <td>
                <span class="status-badge ${bill.status}">
                    ${bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </span>
            </td>
            <td class="action-buttons">
                <button class="action-btn view" onclick="viewBill('${bill.billNo}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editBill('${bill.billNo}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteBill('${bill.billNo}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBills = billsData.filter(bill => 
        bill.guestName.toLowerCase().includes(searchTerm) ||
        bill.billNo.toLowerCase().includes(searchTerm) ||
        bill.roomNo.toLowerCase().includes(searchTerm)
    );
    populateBillsTable(filteredBills);
});

// Filter functionality
function applyFilters() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.getElementById('statusFilter').value;

    let filteredBills = billsData;

    if (startDate && endDate) {
        filteredBills = filteredBills.filter(bill => 
            bill.checkIn >= startDate && bill.checkOut <= endDate
        );
    }

    if (status) {
        filteredBills = filteredBills.filter(bill => bill.status === status);
    }

    populateBillsTable(filteredBills);
}

// Modal functions
function openModal() {
    document.getElementById('deleteModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

// Bill actions
function viewBill(billNo) {
    // In a real application, this would redirect to the bill preview page
    window.location.href = `bill-preview.html?id=${billNo}`;
}

function editBill(billNo) {
    // In a real application, this would redirect to the bill generator page with the bill data
    window.location.href = `bill-generator.html?id=${billNo}`;
}

let billToDelete = null;

function deleteBill(billNo) {
    billToDelete = billNo;
    openModal();
}

function confirmDelete() {
    if (billToDelete) {
        // In a real application, this would make an API call to delete the bill
        const index = billsData.findIndex(bill => bill.billNo === billToDelete);
        if (index > -1) {
            billsData.splice(index, 1);
            populateBillsTable();
        }
    }
    closeModal();
    billToDelete = null;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    populateBillsTable();
});