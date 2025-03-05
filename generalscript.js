// Existing DOMContentLoaded and event listener setup
document.addEventListener('DOMContentLoaded', function () {
    const inputFields = document.querySelectorAll('input, select');
    inputFields.forEach(function (input) {
        input.addEventListener('input', calculateFinalPrice);
        input.addEventListener('change', calculateFinalPrice);
    });

    // Add event listener for the Print button
    document.getElementById('printBtn').addEventListener('click', printEstimate);

    calculateFinalPrice(); // Initial calculation on page load
});

// Existing calculateFinalPrice() function
function calculateFinalPrice() {
    const pdu = document.getElementById('pdu').value.toUpperCase();
    const epd = parseFloat(document.getElementById('epd').value) || 0;
    const material = parseFloat(document.getElementById('material').value) || 0;
    const rentals = parseFloat(document.getElementById('rentals').value) || 0;
    const mac = document.getElementById('mac').value;
    const am = parseInt(document.getElementById('am').value) || 0;
    const permits = Array.from(document.querySelectorAll('#permits input[name="permits"]:checked')).map(input => input.value);
    const discount = document.getElementById('discount').value;
    const financingOption = document.getElementById('financing').value;
    const finalPriceSpan = document.getElementById('finalPrice');

    let finalPrice = 0;

    // Define and calculate individual cost variables
    let projectDurationCost = pdu === 'DAYS' ? epd * 8 * 453 : epd * 453;
    let materialCost = material * 2;
    let rentalCost = rentals * 1.5;

    // Calculate machinery/equipment cost
    let machineryCost = 0;
    if (pdu === 'DAYS') {
        switch (mac) {
            case 'eb':
                machineryCost = 50 * epd;
                break;
            case 'es':
            case 'bc':
            case 'hydro':
                machineryCost = 40 * epd;
                break;
            case 'dump':
                machineryCost = 30 * epd;
                break;
            case 'tp':
            case 'shoring':
                machineryCost = 10 * epd;
                break;
            case 'vr':
                machineryCost = 20 * epd;
                break;
            case 'tmac':
                machineryCost = 50 * epd;
                break;
        }
    } else {
        switch (mac) {
            case 'eb':
                machineryCost = 6.25 * epd;
                break;
            case 'es':
            case 'bc':
            case 'hydro':
                machineryCost = 5 * epd;
                break;
            case 'dump':
                machineryCost = 3.75 * epd;
                break;
            case 'tp':
            case 'shoring':
                machineryCost = 1.25 * epd;
                break;
            case 'vr':
                machineryCost = 2.5 * epd;
                break;
            case 'tmac':
                machineryCost = 6.25 * epd;
                break;
        }
    }

    // Calculate labor cost
    let laborCost = pdu === 'DAYS' ? am * epd * 8 * 75 : am * epd * 75;

    // Calculate permits cost
    let permitsCost = 0;
    permits.forEach(permit => {
        switch (permit) {
            case 'building':
                permitsCost += 350;
                break;
            case 'encroachment':
                permitsCost += 1550;
                break;
            case 'sewer':
                permitsCost += 450;
                break;
        }
    });

    // Add up all costs to final price
    let totalCost = projectDurationCost + materialCost + rentalCost + machineryCost + laborCost + permitsCost;
    let discountValue = 0;

    // Apply discounts
    if (discount === '5%') {
        discountValue = totalCost * 0.05;
        finalPrice = totalCost - discountValue;
    } else if (discount === '10%') {
        discountValue = totalCost * 0.1;
        finalPrice = totalCost - discountValue;
    } else {
        finalPrice = totalCost;
    }

    // Apply financing option adjustments
    if (financingOption === '2611') {
        finalPrice *= 1.05;
    } else if (financingOption === '9998') {
        finalPrice *= 1.055;
    }

    // Check if AFTER HOURS is enabled
    const afterHours = document.getElementById('afterHours').checked;
    if (afterHours) {
        finalPrice += finalPrice * 0.2; // Increase by 20%
    }

    // Update the displayed price
    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);

    // Display the breakdown summary
    displayBreakdown(projectDurationCost, materialCost, rentalCost, machineryCost, laborCost, permitsCost, discountValue);
}

function displayBreakdown(projectDurationCost, materialCost, rentalCost, machineryCost, laborCost, permitsCost, discountValue) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Project Duration Cost: $${projectDurationCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Material Cost: $${materialCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Rental Cost: $${rentalCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Machinery/Equipment Cost: $${machineryCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Labor Cost: $${laborCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Permits Cost: $${permitsCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Discount Applied: -$${discountValue.toFixed(2)}<br>
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}

function printEstimate() {
    const logoSrc = document.querySelector('.logo').src;
    const finalPrice = document.getElementById('finalPrice').textContent;
    const breakdown = document.getElementById('breakdown').innerHTML;

    // Capture user-entered values
    const pdu = document.getElementById('pdu').value;
    const epd = document.getElementById('epd').value || 0;
    const material = document.getElementById('material').value || 0;
    const rentals = document.getElementById('rentals').value || 0;
    const mac = document.getElementById('mac').value;
    const am = document.getElementById('am').value || 0;
    const discount = document.getElementById('discount').value;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Estimate Summary - Bayshore Plumbers</title>
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
            <img src="${logoSrc}" alt="Bayshore Plumbers Logo" class="logo">
            <h1>Estimate Summary</h1>
            <div class="summary">
                <p><strong>Project Duration Unit:</strong> ${pdu}</p>
                <p><strong>Estimated Project Duration:</strong> ${epd}</p>
                <p><strong>Material Expenses:</strong> $${material}</p>
                <p><strong>Rental Expenses:</strong> $${rentals}</p>
                <p><strong>Number of Labors Required:</strong> ${am}</p>
                <p><strong>Selected Machinery/Equipment:</strong> ${mac}</p>
                <p><strong>Discount Applied:</strong> ${discount}</p>
                <p><strong>Final Bidding Price:</strong> ${finalPrice}</p>
                <p>${breakdown}</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
