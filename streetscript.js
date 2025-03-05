document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateFinalPrice);

    var inputFields = document.querySelectorAll('input, select');
    inputFields.forEach(function(input) {
        input.addEventListener('input', calculateFinalPrice);
        input.addEventListener('change', calculateFinalPrice);
    });

    // Add event listener for print button
    document.getElementById('printBtn').addEventListener('click', printEstimate);

    calculateFinalPrice();
});

function calculateFinalPrice() {
    var method = document.getElementById('method');
    var ed = parseFloat(document.getElementById('ed').value) || 0; // Allow decimals for ED
    var swr = document.getElementById('swr');
    var atr = document.getElementById('atr');
    var bm = document.getElementById('bm');
    var el = parseInt(document.getElementById('el').value) || 0;
    var ct = document.getElementById('ct');
    var scr = document.getElementById('scr');
    var depth = parseInt(document.getElementById('depth').value) || 0;
    var others = parseFloat(document.getElementById('others').value) || 0;
    var discount = document.getElementById('discount').value.toUpperCase();
    var checkbox5 = document.getElementById('checkbox5');
    var upperMethod = document.getElementById('upperMethod');
    var landscape = document.getElementById('landscape').value.toUpperCase();
    var ull = parseInt(document.getElementById('ull').value) || 0;
    var ubm = document.getElementById('ubm').value.toUpperCase();
    var am = parseInt(document.getElementById('am').value) || 0;
    var finalPriceSpan = document.getElementById('finalPrice');
    var financingOption = document.getElementById('financing').value;

    var finalPrice = 2620;

    finalPrice += others * 1.2;

    if (method.value.toUpperCase() === 'OPEN TRENCH') {
        if (atr.checked) {
            switch (el) {
                case 10:
                    finalPrice += 4300 * 1.2;
                    break;
                case 20:
                    finalPrice += 4300 * 1.2;
                    break;
                case 25:
                    finalPrice += 4800 * 1.2;
                    break;
                case 30:
                    finalPrice += 5800 * 1.2;
                    break;
                case 35:
                    finalPrice += 6800 * 1.2;
                    break;
                case 40:
                    finalPrice += 7800 * 1.2;
                    break;
                default:
                    console.log('Invalid value for el:', el);
            }
        } else { // atr is not checked
            switch (el) {
                case 10:
                    finalPrice += 4000 * 1.2;
                    break;
                case 20:
                    finalPrice += 4000 * 1.2;
                    break;
                case 25:
                    finalPrice += 4200 * 1.2;
                    break;
                case 30:
                    finalPrice += 5200 * 1.2;
                    break;
                case 35:
                    finalPrice += 6200 * 1.2;
                    break;
                case 40:
                    finalPrice += 7200 * 1.2;
                    break;
                default:
                    console.log('Invalid value for el:', el);
            }
        }
    } else if (method.value.toUpperCase() === 'TRENCHLESS') {
        if (atr.checked) {
            finalPrice += 5280 * 1.2;
        } else {
            finalPrice += 4410 * 1.2;
        }
    } else {
        console.log('Invalid method:', method.value);
    }

    if (swr.checked) {
        finalPrice += 200;
    }

    if (bm.value.toUpperCase() === 'BASE ROCK' && method.value.toUpperCase() === 'OPEN TRENCH') {
        finalPrice += 480;
    } else if (bm.value.toUpperCase() === 'BASE ROCK' && method.value.toUpperCase() === 'TRENCHLESS') {
        finalPrice -= 400;
    }

    if (ct.checked) {
        finalPrice += 1800 * 1.2;
    }

    if (scr.checked) {
        finalPrice += 600 * 1.2;
    }

    if (depth >= 5) {
        finalPrice += (depth - 5) * 1000 * 1.2;
    }

    if (checkbox5.checked) {
        if (upperMethod.value.toUpperCase() === 'OPEN TRENCH') {
            finalPrice += 90 * ull * 1.2;
        } else if (upperMethod.value.toUpperCase() === 'TRENCHLESS') {
            finalPrice += 45 * ull * 1.2;
        }

        if (ubm === 'BASE ROCK') {
            finalPrice += 45 * ull * 1.2;
        }

        if (landscape === 'DIRT') {
            finalPrice += ull * 25 * 1.2;
        } else if ((method.value.toUpperCase() === 'OPEN TRENCH' && landscape === 'PAVERS') || 
                   (landscape === 'ASPHALT' || landscape === 'CONCRETE')) {
            finalPrice += ull * 90 * 1.2;
        } else if ((method.value.toUpperCase() === 'TRENCHLESS' && landscape === 'PAVERS') || 
                   (landscape === 'ASPHALT' || landscape === 'CONCRETE')) {
            finalPrice += ull * 45 * 1.2;
        }
    }

    finalPrice += am * 8 * 75;

    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    finalPrice += ed * 8 * 678;
    switch (financingOption) {
        case 'none':
        case '2832':
            // No change in final bidding price
            break;
        case '2611':
            // Increase final bidding price by 5%
            finalPrice *= 1.05;
            break;
        case '9998':
            // Increase final bidding price by 5.5%
            finalPrice *= 1.055;
            break;
        default:
            console.log('Invalid financing option:', financingOption);
    }

    // Check if AFTER HOURS is enabled
    var afterHours = document.getElementById('afterHours').checked;

    // Final calculation logic
    if (afterHours) {
        finalPrice += finalPrice * 0.2; // Increase by 20%
    }

    // Update the displayed price
    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);

displayBreakdown(method, el, others, discount, swr, atr, bm, ct, scr, depth, checkbox5, upperMethod, landscape, ull, ubm, am, financingOption, ed);
}

function displayBreakdown(method, el, others, discount, swr, atr, bm, ct, scr, depth, checkbox5, upperMethod, landscape, ull, ubm, am, financingOption, ed) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br> 
        &nbsp;&nbsp;&nbsp;&nbsp;- Replacement/Installation Method: ${method.value}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Encroachment Length: ${el} ft<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Other Expenses: $${others.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Discount Applied: ${discount}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Sidewalk Repair: ${swr.checked ? "Yes" : "No"}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Asphalt T-Cut: ${atr.checked ? "Yes" : "No"}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Backfill Material: ${bm.value}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Compaction Test: ${ct.checked ? "Yes" : "No"}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Seal Coat: ${scr.checked ? "Yes" : "No"}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Depth: ${depth} ft<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Upper Lateral Included: ${checkbox5.checked ? "Yes" : "No"}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Upper Method: ${upperMethod.value}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Landscape: ${landscape}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Upper Lateral Length: ${ull} ft<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Upper Backfill Material: ${ubm}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Additional Manpower: ${am}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Financing Option: ${financingOption}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Estimated Days: ${ed} days<br>
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}

function printEstimate() {
    const logoSrc = document.querySelector('.logo').src;
    const finalPrice = document.getElementById('finalPrice').textContent;
    const breakdown = document.getElementById('breakdown').innerHTML;

    // Capture user-entered values
    const method = document.getElementById('method').value;
    const ed = document.getElementById('ed').value || 'N/A';
    const swr = document.getElementById('swr').checked ? 'Yes' : 'No';
    const atr = document.getElementById('atr').checked ? 'Yes' : 'No';
    const bm = document.getElementById('bm').value;
    const el = document.getElementById('el').value || 'N/A';
    const ct = document.getElementById('ct').checked ? 'Yes' : 'No';
    const scr = document.getElementById('scr').checked ? 'Yes' : 'No';
    const depth = document.getElementById('depth').value || 'N/A';
    const others = document.getElementById('others').value || '0.00';
    const discount = document.getElementById('discount').value;
    const checkbox5 = document.getElementById('checkbox5').checked ? 'Yes' : 'No';
    const upperMethod = document.getElementById('upperMethod').value;
    const landscape = document.getElementById('landscape').value;
    const ull = document.getElementById('ull').value || 'N/A';
    const ubm = document.getElementById('ubm').value;
    const am = document.getElementById('am').value || 'N/A';
    const financingOption = document.getElementById('financing').value;
    const afterHours = document.getElementById('afterHours').checked ? 'Yes' : 'No';

    // Open new print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Estimate Summary - Street Project</title>
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
                <p><strong>Replacement/Installation Method:</strong> ${method}</p>
                <p><strong>Encroachment Length:</strong> ${el} ft</p>
                <p><strong>Estimated Days:</strong> ${ed}</p>
                <p><strong>Sidewalk Repair:</strong> ${swr}</p>
                <p><strong>Asphalt T-Cut:</strong> ${atr}</p>
                <p><strong>Compaction Test:</strong> ${ct}</p>
                <p><strong>Seal Coat:</strong> ${scr}</p>
                <p><strong>Depth:</strong> ${depth} ft</p>
                <p><strong>Other Expenses:</strong> $${parseFloat(others).toFixed(2)}</p>
                <p><strong>Discount Applied:</strong> ${discount}</p>
                <p><strong>Upper Lateral Included:</strong> ${checkbox5}</p>
                <p><strong>Upper Method:</strong> ${upperMethod}</p>
                <p><strong>Landscape:</strong> ${landscape}</p>
                <p><strong>Upper Lateral Length:</strong> ${ull} ft</p>
                <p><strong>Upper Backfill Material:</strong> ${ubm}</p>
                <p><strong>Additional Manpower:</strong> ${am}</p>
                <p><strong>Financing Option:</strong> ${financingOption}</p>
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
