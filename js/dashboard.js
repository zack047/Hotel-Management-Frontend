// Toggle sidebar on mobile
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Sample data for recent bills
const recentBills = [
    {
        guestName: "John Smith",
        roomNo: "301",
        checkIn: "2025-09-28",
        amount: "₹850",
        status: "Paid"
    },
    {
        guestName: "Emma Wilson",
        roomNo: "405",
        checkIn: "2025-09-29",
        amount: "₹1,200",
        status: "Pending"
    },
    {
        guestName: "Michael Brown",
        roomNo: "202",
        checkIn: "2025-09-30",
        amount: "₹650",
        status: "Paid"
    }
];

// Populate recent bills table
function populateRecentBills() {
    const tableBody = document.getElementById('recentBillsTable');
    
    recentBills.forEach(bill => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bill.guestName}</td>
            <td>${bill.roomNo}</td>
            <td>${bill.checkIn}</td>
            <td>${bill.amount}</td>
            <td>
                <span class="status-badge ${bill.status.toLowerCase()}">
                    ${bill.status}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    populateRecentBills();
});