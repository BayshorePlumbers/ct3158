document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input, select').forEach((element) => {
        element.addEventListener('input', calculateTotal);
    });

    // Add event listener for print button
    document.getElementById('printBtn').addEventListener('click', printEstimate);
});

function calculateTotal() {
    let length = parseInt(document.getElementById('length').value) || 0;

    // Check if length is invalid, but only if the user has entered a value
    if (document.getElementById('length').value !== '' && length <= 0) {
        alert('Length must be a positive number.');
        return;
    }

    let houseCleanOut = getCheckboxValue('houseCleanOut', 1500);
    let propertyLineCleanOut = getCheckboxValue('propertyLineCleanOut', 2500);
    let landscape = parseInt(document.getElementById('landscape').value) || 0;
    let reInstate = parseInt(document.getElementById('reInstate').value) || 0;
    let buildingPermit = getCheckboxValue('buildingPermit', 350);
    let otherExpenses = parseFloat(document.getElementById('otherExpenses').value) || 0;

    // Calculate the base price based on length
    let basePrice = calculateBasePrice(length);

    // Calculate total price
    let totalCost = basePrice + houseCleanOut + propertyLineCleanOut + landscape +
        (reInstate * 1500) + buildingPermit + otherExpenses;

    let discountValue = 0;
    const discount = document.getElementById('discount')?.value || 'no discount';

    // Apply discounts
    if (discount === '5%') {
        discountValue = totalCost * 0.05;
        totalCost -= discountValue;
    } else if (discount === '10%') {
        discountValue = totalCost * 0.1;
        totalCost -= discountValue;
    }

    // Check if AFTER HOURS is enabled
    const afterHours = document.getElementById('afterHours').checked;
    if (afterHours) {
        totalCost += totalCost * 0.2; // Increase by 20%
    }

    // Format total as currency
    let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalCost);

    // Update the total price in the UI
    document.getElementById('totalPrice').innerText = formattedTotal;

    // Display breakdown summary
    displayBreakdown(basePrice, houseCleanOut, propertyLineCleanOut, landscape, reInstate, buildingPermit, otherExpenses, discountValue);
}

function calculateBasePrice(length) {
    if (length <= 5) return 4000;
    if (length === 6) return 4000 + 385;
    if (length === 7) return 4000 + 385 * 2;
    if (length === 8) return 4000 + 385 * 3;
    if (length === 9) return 4000 + 385 * 4;
    if (length === 10) return 5000;
    if (length === 11) return 5000 + 385;
    if (length === 12) return 5000 + 385 * 2;
    if (length === 13) return 5000 + 385 * 3;
    if (length >= 14) return 385 * length;

    return 5000 + (length - 10) * 385;
}

function getCheckboxValue(id, cost) {
    return document.getElementById(id).checked ? cost : 0;
}

function displayBreakdown(basePrice, houseCleanOut, propertyLineCleanOut, landscape, reInstate, buildingPermit, otherExpenses, discountValue) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br> 
        &nbsp;&nbsp;&nbsp;&nbsp;- Base Price: $${basePrice.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- House Clean Out: $${houseCleanOut}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Property Line Clean Out: $${propertyLineCleanOut}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Landscape: $${landscape}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Re-Instate (${reInstate}): $${(reInstate * 1500).toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Building Permit: $${buildingPermit}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Other Expenses: $${otherExpenses.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Discount Applied: -$${discountValue.toFixed(2)}
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}

function printEstimate() {
    const logoSrc = document.querySelector('.logo').src;
    const totalPrice = document.getElementById('totalPrice').textContent;
    const breakdown = document.getElementById('breakdown').innerHTML;

    // Capture user-entered values
    const length = document.getElementById('length').value || 0;
    const houseCleanOut = document.getElementById('houseCleanOut').checked ? 'Yes' : 'No';
    const propertyLineCleanOut = document.getElementById('propertyLineCleanOut').checked ? 'Yes' : 'No';
    const landscape = document.getElementById('landscape').value || 'None';
    const reInstate = document.getElementById('reInstate').value || 0;
    const buildingPermit = document.getElementById('buildingPermit').checked ? 'Yes' : 'No';
    const otherExpenses = document.getElementById('otherExpenses').value || 0;
    const discount = document.getElementById('discount')?.value || 'no discount';

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Estimate Summary</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    line-height: 1.6;
                }
                .logo {
                    display: block;
                    margin: 0 auto;
                    width: 150px;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .summary {
                    border: 1px solid #000;
                    padding: 15px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <img src="${logoSrc}" alt="Logo" class="logo">
            <h1>Estimate Summary</h1>
            <div class="summary">
                <p><strong>Length:</strong> ${length} ft</p>
                <p><strong>House Clean Out:</strong> ${houseCleanOut}</p>
                <p><strong>Property Line Clean Out:</strong> ${propertyLineCleanOut}</p>
                <p><strong>Landscape:</strong> ${landscape}</p>
                <p><strong>Re-Instate:</strong> ${reInstate}</p>
                <p><strong>Building Permit:</strong> ${buildingPermit}</p>
                <p><strong>Other Expenses:</strong> $${otherExpenses}</p>
                <p><strong>Discount Applied:</strong> ${discount}</p>
                <p><strong>Total Price:</strong> ${totalPrice}</p>
                <p>${breakdown}</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
