document.addEventListener('DOMContentLoaded', function() {
    const biddingForm = document.getElementById('biddingForm');
    biddingForm.addEventListener('input', calculateFinalPrice);
    biddingForm.addEventListener('change', calculateFinalPrice);

    document.getElementById('am').value = 'nr';

    // Add event listener for print button
    document.getElementById('printBtn').addEventListener('click', printEstimate);

    calculateFinalPrice(); // Calculate final price when the page loads
});


function calculateFinalPrice() {
    const ed = parseFloat(document.getElementById('ed').value) || 0;
    const method = document.getElementById('method').value.toLowerCase();
    const am = document.getElementById('am').value;
    const swr = document.getElementById('swr').checked;
    const landscape = document.getElementById('landscape').value.toLowerCase();
    const bm = document.getElementById('bm').value.toLowerCase();
    const pb = document.getElementById('pb').value.toLowerCase();
    const permits = document.getElementById('permits').value.toLowerCase();
    const depth = parseFloat(document.getElementById('depth').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const discount = document.getElementById('discount').value;
    const dumping = parseFloat(document.getElementById('dumping').value) || 0;
    const financingOption = document.getElementById('financing').value;
    const finalPriceSpan = document.getElementById('finalPrice');

    let finalPrice = 0;

    // Define and calculate individual cost variables
    let othersCost = others * 1.2;
    let methodCost = (method === 'open trench') ? 960 * 1.2 : 1010 * 1.2;

    let amCost = 0;
    if (am === '1d') amCost = 75 * 8 * 1 * 1.2;
    else if (am === '2d') amCost = 75 * 8 * 2 * 1.2;
    else if (am === '3d') amCost = 75 * 8 * 3 * 1.2;

    let swrCost = swr ? 400 * 1.2 : 0;

    let landscapeCost = 0;
    if (method === 'open trench') {
        if (landscape === 'pavers') landscapeCost = 1200 * 1.2;
        else if (landscape === 'asphalt') landscapeCost = 350 * 1.2;
        else if (landscape === 'concrete') landscapeCost = 600 * 1.2;
    } else if (method === 'trenchless') {
        if (landscape === 'pavers') landscapeCost = 400 * 1.2;
        else if (landscape === 'asphalt') landscapeCost = 150 * 1.2;
        else if (landscape === 'concrete') landscapeCost = 100 * 1.2;
    }

    let bmCost = bm === 'base rock' ? 630 * 1.2 : 0;
    let pbCost = pb !== 'native soil' ? 90 * 1.2 : 0;

    let permitsCost = 0;
    if (permits === 'building') permitsCost = 350 * 1.2;
    else if (permits === 'sidewalk') permitsCost = 900 * 1.2;
    else if (permits === 'sewer') permitsCost = 450 * 1.2;
    else if (permits === 'bas') permitsCost = 800 * 1.2;

    let depthCost = depth > 5 ? (depth - 5) * 1000 * 1.2 : 0;
    let dumpingCost = dumping * 60 * 1.2;
    let edCost = ed * 8 * 678 * 1.2;

    // Add all the costs to finalPrice
    finalPrice = othersCost + methodCost + amCost + swrCost + landscapeCost +
                 bmCost + pbCost + permitsCost + depthCost + dumpingCost + edCost;

    // Apply discounts
    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    // Apply financing option adjustments
    if (financingOption === '2611') {
        finalPrice *= 1.05;
    } else if (financingOption === '9998') {
        finalPrice *= 1.055;
    }

    // Check if AFTER HOURS is enabled
    var afterHours = document.getElementById('afterHours').checked;
    
    // Final calculation logic
    if (afterHours) {
        finalPrice += finalPrice * 0.2; // Increase by 20%
    }

    // Display the final calculated price
    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);

    // Display the breakdown summary
    displayBreakdown(methodCost, amCost, swrCost, landscapeCost, bmCost, pbCost, permitsCost, depthCost, dumpingCost, edCost, othersCost);
}

function displayBreakdown(methodCost, amCost, swrCost, landscapeCost, bmCost, pbCost, permitsCost, depthCost, dumpingCost, edCost, othersCost) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Method Cost: $${methodCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Additional Manpower Cost: $${amCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Sidewalk Repair Cost: $${swrCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Landscape Cost: $${landscapeCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Backfill Material Cost: $${bmCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Pipe Bedding Cost: $${pbCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Permits Cost: $${permitsCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Depth Adjustment Cost: $${depthCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Dumping Cost: $${dumpingCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Estimated Days Cost: $${edCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Other Expenses: $${othersCost.toFixed(2)}
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}

function printEstimate() {
    const logoSrc = document.querySelector('.logo').src;
    const finalPrice = document.getElementById('finalPrice').textContent;
    const breakdown = document.getElementById('breakdown').innerHTML;

    // Capture user-entered values
    const ed = document.getElementById('ed').value || 'N/A';
    const method = document.getElementById('method').value;
    const am = document.getElementById('am').value;
    const swr = document.getElementById('swr').checked ? 'Yes' : 'No';
    const landscape = document.getElementById('landscape').value;
    const bm = document.getElementById('bm').value;
    const pb = document.getElementById('pb').value;
    const permits = document.getElementById('permits').value;
    const depth = document.getElementById('depth').value || 'N/A';
    const others = document.getElementById('others').value || '0.00';
    const dumping = document.getElementById('dumping').value || '0.00';
    const discount = document.getElementById('discount').value;
    const financing = document.getElementById('financing').value;
    const afterHours = document.getElementById('afterHours').checked ? 'Yes' : 'No';

    // Open new print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Estimate Summary - Upper Sewer Lateral</title>
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
                .summary p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <img src="${logoSrc}" alt="Logo" class="logo">
            <h1>Estimate Summary</h1>
            <div class="summary">
                <p><strong>Estimated Days:</strong> ${ed}</p>
                <p><strong>Replacement/Installation Method:</strong> ${method}</p>
                <p><strong>Additional Manpower:</strong> ${am}</p>
                <p><strong>Sidewalk Repair Required:</strong> ${swr}</p>
                <p><strong>Landscape:</strong> ${landscape}</p>
                <p><strong>Backfill Material:</strong> ${bm}</p>
                <p><strong>Pipe Bedding:</strong> ${pb}</p>
                <p><strong>Permits:</strong> ${permits}</p>
                <p><strong>Depth (ft):</strong> ${depth}</p>
                <p><strong>Other Expenses:</strong> $${parseFloat(others).toFixed(2)}</p>
                <p><strong>Dumping (Yards):</strong> ${dumping}</p>
                <p><strong>Discount:</strong> ${discount}</p>
                <p><strong>Financing Option:</strong> ${financing}</p>
                <p><strong>After Hours:</strong> ${afterHours}</p>
                <p><strong>Final Bidding Price:</strong> ${finalPrice}</p>
                <hr>
                <div>${breakdown}</div>
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}