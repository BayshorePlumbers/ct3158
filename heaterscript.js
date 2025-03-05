document.addEventListener('DOMContentLoaded', function () {
    const inputFields = document.querySelectorAll('#biddingForm input, #biddingForm select');
    inputFields.forEach(function (input) {
        input.addEventListener('input', calculateFinalPrice);
        input.addEventListener('change', calculateFinalPrice);
    });

    document.getElementById('printBtn').addEventListener('click', printEstimate); // Add event listener for the print button

    calculateFinalPrice(); // Initial calculation on page load
});

function calculateFinalPrice() {
    const et = parseFloat(document.getElementById('et').value) || 0;
    const material = parseFloat(document.getElementById('material').value) || 0;
    const am = parseFloat(document.getElementById('am').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const discount = document.getElementById('discount').value;
    const permits = document.getElementById('permits');
    const financingOption = document.getElementById('financing').value;
    const finalPriceSpan = document.getElementById('finalPrice');

    let finalPrice = 0;

    // Define and calculate individual cost variables
    let materialCost = material * 1.5;
    let manpowerCost = am * et * 75;
    let othersCost = others * 1.2;
    let permitsCost = permits.checked ? 350 : 0;
    let estimatedTimeCost = et * 453;

    // Calculate total final price
    let totalCost = materialCost + manpowerCost + othersCost + permitsCost + estimatedTimeCost;
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

    // Display the final calculated price
    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);

    // Display the breakdown summary
    displayBreakdown(materialCost, manpowerCost, othersCost, permitsCost, estimatedTimeCost, discountValue);
}

function displayBreakdown(materialCost, manpowerCost, othersCost, permitsCost, estimatedTimeCost, discountValue) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Material Cost: $${materialCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Additional Manpower Cost: $${manpowerCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Other Expenses: $${othersCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Permits Cost: $${permitsCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Estimated Time Cost: $${estimatedTimeCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Discount Applied: -$${discountValue.toFixed(2)}
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}

function printEstimate() {
    const logoSrc = document.querySelector('.logo').src;
    const finalPrice = document.getElementById('finalPrice').textContent;
    const breakdown = document.getElementById('breakdown').innerHTML;

    // Capture user-entered values
    const et = document.getElementById('et').value || 0;
    const material = document.getElementById('material').value || 0;
    const am = document.getElementById('am').value || 0;
    const others = document.getElementById('others').value || 0;
    const discount = document.getElementById('discount').value;
    const permits = document.getElementById('permits').checked ? 'Yes' : 'No';
    const financingOption = document.getElementById('financing').value;

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
                .summary strong {
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <img src="${logoSrc}" alt="Bayshore Plumbers Logo" class="logo">
            <h1>Estimate Summary</h1>
            <div class="summary">
                <p><strong>Estimated Time:</strong> ${et} hours</p>
                <p><strong>Material Expenses:</strong> $${material}</p>
                <p><strong>Additional Manpower:</strong> ${am}</p>
                <p><strong>Other Expenses:</strong> $${others}</p>
                <p><strong>Permits Required:</strong> ${permits}</p>
                <p><strong>Financing Option:</strong> ${financingOption}</p>
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
