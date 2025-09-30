// Room rates
const roomRates = {
    standard: 150,
    deluxe: 250,
    suite: 400
};

// Update room rate when room type changes
document.getElementById('roomType').addEventListener('change', function(e) {
    const rate = roomRates[e.target.value] || '';
    document.getElementById('roomRate').value = rate;
});

// Calculate number of nights
function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Calculate total amount
function calculateTotal() {
    const roomRate = parseFloat(document.getElementById('roomRate').value) || 0;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const nights = calculateNights(checkIn, checkOut);
    
    let subtotal = roomRate * nights;

    // Add services
    const serviceInputs = document.querySelectorAll('.service-item input[type="number"]');
    serviceInputs.forEach(input => {
        if (input.value && input.previousElementSibling.querySelector('input[type="checkbox"]').checked) {
            subtotal += parseFloat(input.value);
        }
    });

    // Apply tax
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const tax = (subtotal * taxRate) / 100;

    // Apply discount
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const discountAmount = (subtotal * discount) / 100;

    const total = subtotal + tax - discountAmount;

    return {
        subtotal,
        tax,
        discount: discountAmount,
        total,
        nights
    };
}

// Handle form submission
document.getElementById('billForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const billData = {
        guestName: formData.get('guestName'),
        roomNo: formData.get('roomNo'),
        checkIn: formData.get('checkIn'),
        checkOut: formData.get('checkOut'),
        roomType: formData.get('roomType'),
        ...calculateTotal()
    };

    // Store bill data in session storage
    sessionStorage.setItem('currentBill', JSON.stringify(billData));
    
    // Redirect to bill preview page
    window.location.href = 'bill-preview.html';
});