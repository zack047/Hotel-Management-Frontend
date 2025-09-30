// Handle logo upload preview
document.getElementById('hotelLogo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('logoPreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Handle color picker value display
function updateColorValue(input) {
    const valueSpan = input.parentElement.querySelector('.color-value');
    valueSpan.textContent = input.value;
}

document.getElementById('primaryColor').addEventListener('input', function(e) {
    updateColorValue(this);
    document.documentElement.style.setProperty('--primary-color', this.value);
});

document.getElementById('accentColor').addEventListener('input', function(e) {
    updateColorValue(this);
    document.documentElement.style.setProperty('--accent-color', this.value);
});

// Save settings
function saveSettings() {
    // Collect form data
    const hotelInfo = {
        name: document.getElementById('hotelName').value,
        address: document.getElementById('hotelAddress').value,
        phone: document.getElementById('hotelPhone').value,
        email: document.getElementById('hotelEmail').value
    };

    const themeSettings = {
        primaryColor: document.getElementById('primaryColor').value,
        accentColor: document.getElementById('accentColor').value,
        themeMode: document.querySelector('input[name="themeMode"]:checked').value
    };

    const billSettings = {
        taxRate: document.getElementById('taxRate').value,
        currency: document.getElementById('currency').value,
        billFormat: document.getElementById('billFormat').value,
        billFooter: document.getElementById('billFooter').value
    };

    // In a real application, this would make an API call to save the settings
    const settings = {
        hotelInfo,
        themeSettings,
        billSettings
    };

    localStorage.setItem('hotelSettings', JSON.stringify(settings));
    
    // Show success message
    alert('Settings saved successfully!');
}

// Load saved settings
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('hotelSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply hotel info
        if (settings.hotelInfo) {
            document.getElementById('hotelName').value = settings.hotelInfo.name;
            document.getElementById('hotelAddress').value = settings.hotelInfo.address;
            document.getElementById('hotelPhone').value = settings.hotelInfo.phone;
            document.getElementById('hotelEmail').value = settings.hotelInfo.email;
        }

        // Apply theme settings
        if (settings.themeSettings) {
            document.getElementById('primaryColor').value = settings.themeSettings.primaryColor;
            document.getElementById('accentColor').value = settings.themeSettings.accentColor;
            document.querySelector(`input[name="themeMode"][value="${settings.themeSettings.themeMode}"]`).checked = true;
            
            // Update color value displays
            updateColorValue(document.getElementById('primaryColor'));
            updateColorValue(document.getElementById('accentColor'));
            
            // Apply colors to root variables
            document.documentElement.style.setProperty('--primary-color', settings.themeSettings.primaryColor);
            document.documentElement.style.setProperty('--accent-color', settings.themeSettings.accentColor);
        }

        // Apply bill settings
        if (settings.billSettings) {
            document.getElementById('taxRate').value = settings.billSettings.taxRate;
            document.getElementById('currency').value = settings.billSettings.currency;
            document.getElementById('billFormat').value = settings.billSettings.billFormat;
            document.getElementById('billFooter').value = settings.billSettings.billFooter;
        }
    }
}

// Initialize settings page
document.addEventListener('DOMContentLoaded', function() {
    loadSavedSettings();
});