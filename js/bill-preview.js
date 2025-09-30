// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IN'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Generate random bill number
function generateBillNumber() {
    const timestamp = Date.now().toString();
    return 'INV-' + timestamp.slice(-6);
}

// Initialize bill preview
function initializeBillPreview() {
    // Get bill data from session storage
    const billData = JSON.parse(sessionStorage.getItem('currentBill'));
    if (!billData) {
        window.location.href = 'bill-generator.html';
        return;
    }

    // Set bill meta information
    document.getElementById('billNo').textContent = generateBillNumber();
    document.getElementById('billDate').textContent = formatDate(new Date());

    // Set guest information
    document.getElementById('guestName').textContent = billData.guestName;
    document.getElementById('roomNo').textContent = billData.roomNo;
    document.getElementById('checkIn').textContent = formatDate(billData.checkIn);
    document.getElementById('checkOut').textContent = formatDate(billData.checkOut);

    // Add room charges to bill items
    const billItems = document.getElementById('billItems');
    const roomRow = document.createElement('tr');
    roomRow.innerHTML = `
        <td>${billData.roomType.charAt(0).toUpperCase() + billData.roomType.slice(1)} Room</td>
        <td>${billData.nights}</td>
        <td>${formatCurrency(billData.subtotal / billData.nights)}</td>
        <td>${formatCurrency(billData.subtotal)}</td>
    `;
    billItems.appendChild(roomRow);

    // Set totals
    document.getElementById('subtotal').textContent = formatCurrency(billData.subtotal);
    document.getElementById('tax').textContent = formatCurrency(billData.tax);
    document.getElementById('discount').textContent = formatCurrency(billData.discount);
    document.getElementById('total').textContent = formatCurrency(billData.total);
}

// Download PDF function (placeholder - would need a PDF library in production)
function downloadPDF() {
    alert('PDF download functionality would be implemented with a PDF library in production.');
    window.print(); // For now, just trigger print
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeBillPreview);