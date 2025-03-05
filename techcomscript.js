/* Global flag for dynamic credit fee addition */
let addCreditFee = false;
/* Global variables to store question answers */
let paymentReceived = "";
let paymentMethod = "";
let creditCardFeeAnswer = "";

// Example: Service items with categories and durations
// (Only partial categorization shown as an example — you can add or adjust as needed.)
const jobTypes = [
        // ========================
        //   WATER HEATERS & TANKLESS
        // ========================
        { name: "30 Gallon Gas Water Heater Swap Out", duration: 3, category: "Water Heaters" },
        { name: "30 Gallon Shorty Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Gas Water Heater installation with misc parts", duration: 3.5, category: "Water Heaters" },
        { name: "40 Gallon Electric Water Heater", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Shorty Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "40 Gallon Shorty Gas Water Heater installation with misc parts", duration: 3.5, category: "Water Heaters" },
        { name: "40 Gallon POWER VENT", duration: 3, category: "Water Heaters" },
        { name: "50 Gallon Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "50 Gallon Gas Water Heater Installation with misc. parts", duration: 3.5, category: "Water Heaters" },
        { name: "50 Gallon Shorty Gas Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "50 Gallon Shorty Gas Water Heater Installation with misc. parts", duration: 3.5, category: "Water Heaters" },
        { name: "50gallon POWER VENT", duration: 3, category: "Water Heaters" },
        { name: "75 Gallon Gas Water Heater Swap Out", duration: 4, category: "Water Heaters" },
        { name: "75 Gallon Gas Water Heater installation with misc parts", duration: 5, category: "Water Heaters" },
        { name: "100 Gallon Gas Water Heater Swap out", duration: 6, category: "Water Heaters" },
        { name: "100 Gallon Gas Water Heater Installation with misc parts (Residential)", duration: 6, category: "Water Heaters" },
        { name: "Swap Out Tankless Water Heater (RSC 199)", duration: 4.5, category: "Tankless" },
        { name: "Install New Tankless Water Heater (Indoor)", duration: 8, category: "Tankless" },
        { name: "Install New Tankless Water Heater (Outdoor)", duration: 8, category: "Tankless" },
        { name: "Descale and Flush Tankless Water Heater", duration: 1, category: "Tankless" },
        { name: "Diagnostic for Tankless Water Heater", duration: 1, category: "Tankless" },
        { name: "Neutralizer Kit", duration: 1, category: "Tankless" },
        { name: "Expansion Tank", duration: 1, category: "Tankless" },
        { name: "Sediment Filter", duration: 1, category: "Tankless" },
        { name: "Run T&P to exterior", duration: 1.5, category: "Water Heaters" },
        { name: "Water Heater Gas Cock Valve", duration: 1, category: "Water Heaters" },
        { name: "Pilot Assembly", duration: 1, category: "Water Heaters" },
        { name: "Ball Valve for Water Heater", duration: 1, category: "Water Heaters" },
        { name: "Control Valve Replacement (Out of Warranty)", duration: 1, category: "Water Heaters" },
        { name: "Recirculating Pump", duration: 1.5, category: "Water Heaters" },
        { name: "Water heater pan swap", duration: 1, category: "Water Heaters" },
        { name: "Premium 50 Gallon Gas American Standard 12 Year Warranty Water Heater Swap out", duration: 3, category: "Water Heaters" },
        { name: "Premium 50 Gallon Gas American Standard Shorebird 12 Year Warranty Water Heater Swap out", duration: 6, category: "Water Heaters" },
        { name: "Burner Assembly", duration: 1, category: "Water Heaters" },
        { name: "Replace T&P", duration: 1, category: "Water Heaters" },
      
        // ========================
        //   DRAIN & SEWER
        // ========================
        { name: "Bathtub/ Shower Clog", duration: 1, category: "Drain" },
        { name: "Kitchen Sink back-up - ACCESSIBLE CLEAN OUT", duration: 1, category: "Drain" },
        { name: "Kitchen Sink back-up - SNAKE UNDER SINK", duration: 1.25, category: "Drain" },
        { name: "Lavatory/ Bathroom sink", duration: 1, category: "Drain" },
        { name: "Snake and Jet 2\" Kitchen Branch drain from accessible clean out", duration: 2, category: "Drain" },
        { name: "Toilet removal to snake", duration: 1.5, category: "Drain" },
        { name: "Utility/ Garage Sink", duration: 1, category: "Drain" },
        { name: "Floor Drain (Commercial)", duration: 1, category: "Drain" },
        { name: "Laundry/ Secondary Drain Line", duration: 1, category: "Drain" },
        { name: "Toilet Clog or Auger Toilet", duration: 1, category: "Drain" },
        { name: "Bar Sink", duration: 1, category: "Drain" },
        { name: "Commercial Floor Sink Stoppage", duration: 1.5, category: "Drain" },
        { name: "Pedestal Lavy Sink Clog Remove Trap", duration: 1.5, category: "Drain" },
        { name: "Video Camera Inspection of Sewer from Accessible Clean Out", duration: 1, category: "Drain" },
        { name: "Video Inspection From Pulled Toilet", duration: 1.5, category: "Drain" },
        { name: "Hydro Jet Drain Line", duration: 2, category: "Drain" },
        { name: "Jetter  Scheduled Maintenance", duration: 2, category: "Drain" },
        { name: "Snake Main Line from accessible clean out", duration: 1, category: "Drain" },
      
        // ========================
        //   FAUCETS / KITCHEN / MISC
        // ========================
        { name: "Deck mount faucet", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "P-Trap (ABS Sch 40)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Wash Machine Hoses", duration: 1, category: "Faucet/Kitchen" },
        { name: "Wash Machine Valves Hot & Cold", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Washer Box", duration: 4, category: "Faucet/Kitchen" },
        { name: "Wall Mount Faucet for the laundry", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "1 HP Garbage Disposal (Badger 5)", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "3/4 HP garbage Disposal (Badger 5)", duration: 1, category: "Faucet/Kitchen" },
        { name: "1/2 HP Garbage Disposal (Badger 5)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Air Gap", duration: 1, category: "Faucet/Kitchen" },
        { name: "All Sink Drains/ Brass", duration: 2, category: "Faucet/Kitchen" },
        { name: "All Sink Drains/ ABS", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Basket Strainer", duration: 1, category: "Faucet/Kitchen" },
        { name: "Extension Tailpiece", duration: 1, category: "Faucet/Kitchen" },
        { name: "Flange Tail", duration: 1, category: "Faucet/Kitchen" },
        { name: "Ice Maker Refrigerator Supply", duration: 1, category: "Faucet/Kitchen" },
        { name: "Insta Hot Standard Model", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Owner Supplied Garbage Disposal", duration: 1, category: "Faucet/Kitchen" },
        { name: "Rebuild Delta", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Rebuild Pfister", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Shut Off Valve Hot & Cold (dual angle stop)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Kitchen Sink faucet repalcement", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Supply Lines Hot & Cold", duration: 1, category: "Faucet/Kitchen" },
        { name: "Install 1 1/2\" Plastic P Trap", duration: 1, category: "Faucet/Kitchen" },
        { name: "Clear & Reset Jammed Disposal", duration: 1, category: "Faucet/Kitchen" },
        { name: "Install 1 1/2\"  P Trap BRASS", duration: 1, category: "Faucet/Kitchen" },
        { name: "Customer Provided Kitchen Sink Faucet Replacement", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Kitchen 2\" Re-Drain upto 20'", duration: 5, category: "Faucet/Kitchen" },
        { name: "Wall Mount Faucet for the kitchen", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "Angle Stop Shut Off Valve- Replace all in home (Up to 12)", duration: 3, category: "Faucet/Kitchen" },
        { name: "2 Handle (4\" Spread)", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Center Set (Single Hole Faucet) (with sprayer)", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Owner Supplied Faucet (4\" or single hole)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Owner Supplied Faucet (wide spread)", duration: 1.5, category: "Faucet/Kitchen" },
        { name: "P - Trap", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Pop- Up Assembly", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Angle Stop Shut Off Valve", duration: 1, category: "Faucet/Kitchen" },
        { name: "Angle Stop Shut off Valve Hot & Cold", duration: 1, category: "Faucet/Kitchen" },
        { name: "Single Handle (4\" Spread)", duration: 1.25, category: "Faucet/Kitchen" },
        { name: "Supply Line", duration: 1, category: "Faucet/Kitchen" },
        { name: "Supply Lines (Hot & Cold)", duration: 1, category: "Faucet/Kitchen" },
        { name: "Threaded Tailpiece", duration: 1, category: "Faucet/Kitchen" },
        { name: "Wide Spread", duration: 1.5, category: "Faucet/Kitchen" },
      
        // ========================
        //   SHOWER / TUB
        // ========================
        { name: "Install Shower Valve", duration: 3, category: "Shower/Tub" },
        { name: "Shower Head Provide and Install", duration: 1, category: "Shower/Tub" },
        { name: "Owner supplied Shower Valve", duration: 3, category: "Shower/Tub" },
        { name: "Tub Spout", duration: 1, category: "Shower/Tub" },
        { name: "Waste and Overflow Replacement from Crawl Space", duration: 2, category: "Shower/Tub" },
        { name: "Waste and Overflow Replacement from Ceiling", duration: 2, category: "Shower/Tub" },
        { name: "Shower Cartridge Replacement (Delta, Moen or Common only)", duration: 1, category: "Shower/Tub" },
      
        // ========================
        //   TOILET / URINAL
        // ========================
        { name: "Fill Valve and Supply Line", duration: 1, category: "Toilet" },
        { name: "Toilet Tank / Flapper", duration: 1, category: "Toilet" },
        { name: "Flush Valve", duration: 1, category: "Toilet" },
        { name: "Toilet Handle", duration: 1, category: "Toilet" },
        { name: "Pressure Assist Toilet Rebuild", duration: 2, category: "Toilet" },
        { name: "Angle Stop Shut Off Valve", duration: 1, category: "Toilet" },
        { name: "Supply Line", duration: 1, category: "Toilet" },
        { name: "Tall/ Elongated (ADA) 2 Piece (Kohler)", duration: 1, category: "Toilet" },
        { name: "Standard 2 piece (gravity flush) toilet", duration: 1, category: "Toilet" },
        { name: "Remove Object from Toilet", duration: 1.25, category: "Toilet" },
        { name: "Urinal Stoppage Through Urinal", duration: 1.5, category: "Toilet" },
        { name: "Urinal Stoppage Remove and Clear", duration: 2, category: "Toilet" },
        { name: "Install Toto ADA Ultramax", duration: 1, category: "Toilet" },
        { name: "Replace Toilet Wax Seal and bolts", duration: 1, category: "Toilet" },
        { name: "Toilet Clog/ Backup", duration: 1, category: "Toilet" },
        { name: "Angle Stop Shut Off Valve/ Replacement for all angle stops in home (up to 12)", duration: 3, category: "Toilet" },
        { name: "Customer-supplied Standard 2 piece toilet", duration: 1, category: "Toilet" },
        { name: "Owner supplied Shower Head", duration: 1, category: "Toilet" },
      
        // ========================
        //   SUMP PUMP
        // ========================
        { name: "Standard Storm Water Sump Pump Swap", duration: 2.5, category: "Sump Pump" },
        { name: "110V Back Up Alarm System for Submergible Sump Pump (Swap)", duration: 2, category: "Sump Pump" },
        { name: "Sewer Sump Pump Swap", duration: 2.5, category: "Sump Pump" },
      
        // ========================
        //   GAS
        // ========================
        { name: "Gas Repair Minimum Charge (without permits or city inspection)", duration: 1.5, category: "Gas" },
        { name: "Install Earthquake Valve 3/4\"", duration: 1.5, category: "Gas" },
        { name: "Install Earthquake Valve 1\"", duration: 1.5, category: "Gas" },
        { name: "Install Earthquake Valve 1 1/4\"", duration: 2, category: "Gas" },
        { name: "Gas Line Pressure Test (no reprairs and no permits)", duration: 1, category: "Gas" },
      
        // ========================
        //   CLEAN OUTS
        // ========================
        { name: "Clean Out 2Way - Standard", duration: 4.5, category: "Clean Outs" },
        { name: "Clean Out 2Way", duration: 4.5, category: "Clean Outs" },
        { name: "Property Line Clean Out - West Bay", duration: 6, category: "Clean Outs" },
        { name: "Property Line Clean Out - Standard", duration: 5, category: "Clean Outs" },
      
        // ========================
        //   LINE LOCATION
        // ========================
        { name: "Line Location from Clean Out (upto 100')", duration: 1, category: "Line Location" },
        { name: "Line Location from Clean Out (more than 100')", duration: 1, category: "Line Location" },
      
        // ========================
        //   PRESSURE / VALVES
        // ========================
        { name: "Pressure Regulating Valve (up to 1\")", duration: 2, category: "Valves" },
        { name: "Replace Ball Valve for Water Main", duration: 2, category: "Valves" }
      ];

// Make handleAnswer globally available
function handleAnswer(answer, questionNumber) {
    switch (questionNumber) {
        case 1:
            if (answer === 'yes') {
                paymentReceived = "Yes";
                document.getElementById('question1').style.display = 'none';
                document.getElementById('question2').style.display = 'block';
            } else {
                paymentReceived = "No";
                document.getElementById('question1').style.display = 'none';
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'none';
            }
            break;
        case 2:
            // Set the payment method based on answer
            if (answer === 'creditCard') {
                paymentMethod = "Credit Card";
                document.getElementById('question2').style.display = 'none';
                document.getElementById('question3').style.display = 'block';
            } else if (answer === 'cashOrDebit') {
                paymentMethod = "Cash/Debit Card";
                document.getElementById('question2').style.display = 'none';
            } else if (answer === 'online') {
                paymentMethod = "Online";
                document.getElementById('question2').style.display = 'none';
            } else if (answer === 'check') {
                paymentMethod = "Check";
                document.getElementById('question2').style.display = 'none';
            }
            break;
        case 3:
            document.getElementById('question3').style.display = 'none';
            // If answer is 'no', it means the credit card fee was not added manually.
            // Set the flag to add 3% of Total Price automatically.
            if (answer === 'no') {
                addCreditFee = true;
                creditCardFeeAnswer = "Not Added (automatic fee applied)";
            } else {
                addCreditFee = false;
                creditCardFeeAnswer = "Yes (fee already added)";
            }
            calculateCommission();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const managerialButton = document.getElementById('managerialAssistanceBtn');
    const oeField = document.getElementById('oe');
    const tpField = document.getElementById('tp');
    const printButton = document.getElementById('printButton');
    let managerialAssistanceUsed = false;
    
    // Populate the Job Type dropdown
    populateJobTypeDropdown();

    // Prevent negative value for Total Price on input change.
    tpField.addEventListener('input', function() {
        if (parseFloat(this.value) < 0) {
            alert("Total Price cannot be negative.");
            this.value = 0;
        }
    });
    
    // Print Button functionality.
    printButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Ask for confirmation before opening the print window.
        if (!confirm("I HAVE HEREBY REVIEWED ALL THE CONTENTS OF THIS DOCUMENT AND TAKE FULL RESPONSIBILITY FOR THE DOCUMENT.")) {
            return;
        }
        // Open the print window immediately (size A4).
        var printWindow = window.open('', '_blank', 'width=800,height=1123');
        if (!printWindow) {
            alert("Popup blocked! Please allow popups for this site.");
            return;
        }
        printContent(printWindow);
    });

    function printContent(printWindow) {
        const technicianName = document.getElementById('tn').value;
        const notes = document.getElementById('notes').value;
        const jobAddress = document.getElementById('ja').value;
        const totalPrice = document.getElementById('tp').value;
        const materialExpenses = document.getElementById('material').value;
        const oe = document.getElementById('oe').value;
        const projectHours = document.getElementById('pd').value;
        const day1 = document.getElementById('day1').value;
        const day2 = document.getElementById('day2').value;
        const day3 = document.getElementById('day3').value;
        const day4 = document.getElementById('day4').value;
        const day5 = document.getElementById('day5').value;
        const additionalHours = document.getElementById('ah').value;
        const overtimeHours = document.getElementById('toh').value;
        const totalHours = document.getElementById('totalHours').value;
        const sw = document.getElementById('sw').value;
        const wh = document.getElementById('wh').value;
        const rd = document.getElementById('rd').value;
        const totalCommission = document.getElementById('totalCommission').textContent;
        const invoiceNumber = document.getElementById('in').value;
        const bpp = document.getElementById('bpp').value;
        const date = document.getElementById('date').value;
        const salesCommission = document.getElementById('salesCommission').textContent;
        const saleType = managerialButton.innerText;

        // Payment info
        const questionsSection = `
            <h3>QUESTIONS & ANSWERS:</h3>
            <table>
                <tr><th>Payment Received:</th><td>${paymentReceived || "N/A"}</td></tr>
                <tr><th>Payment Method:</th><td>${paymentMethod || "N/A"}</td></tr>
                <tr><th>Credit Card Fee Added:</th><td>${creditCardFeeAnswer || "N/A"}</td></tr>
            </table>
        `;
    
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>TECHNICIAN POTENTIAL COMMISSION</title>
                <link rel="stylesheet" href="print.css" type="text/css" media="print">
            </head>
            <body>
                <div class="container">
                    <div class="logo-container">
                        <img src="BP.png" alt="BP logo" class="logo">
                    </div>
                    <h2>TECHNICIAN COMMISSION CALCULATOR</h2>
                    <div class="details-section">
                        <h3>DETAILS:</h3>
                        <table>
                            <tr><th>Technician's Name:</th><td>${technicianName}</td></tr>
                            <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                            <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                            <tr><th>Date:</th><td>${date}</td></tr>
                            <tr><th>Project Hours:</th><td>${projectHours} Hours</td></tr>
                            <tr><th>Material Expenses:</th><td>$${materialExpenses}</td></tr>
                            <tr><th>Other Expenses:</th><td>$${oe}</td></tr>
                            <tr><th>Total Price:</th><td>$${totalPrice}</td></tr>
                            <tr><th>Job Description/Notes:</th><td>${notes}</td></tr>
                        </table>
                    </div>
                    ${questionsSection}
                    <h3>LABOR DETAILS:</h3>
                    <table>
                        <tr><th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th></tr>
                        <tr>
                            <td>${day1}</td>
                            <td>${day2}</td>
                            <td>${day3}</td>
                            <td>${day4}</td>
                        </tr>
                    </table>
                    <table>
                        <tr><th>Day 5</th><th>Additional Hours</th><th>Total Overtime Hours</th><th>Total Hours</th></tr>
                        <tr>
                            <td>${day5}</td>
                            <td>${additionalHours}</td>
                            <td>${overtimeHours}</td>
                            <td>${totalHours}</td>
                        </tr>
                    </table>
                    <h3>FOR OFFICE USE ONLY:</h3>
                    <table>
                        <tr><th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>BPP%</th></tr>
                        <tr>
                            <td>${sw}</td>
                            <td>${wh}</td>
                            <td>${rd}</td>
                            <td>${bpp}</td>
                        </tr>
                    </table>
                    <div class="commission-details-section">
                        <h3>COMMISSION DETAILS:</h3>
                        <table>
                            <tr><th>Technician Commission:</th><td>${totalCommission}</td></tr>
                            <tr><th>Sales Commission:</th><td>${salesCommission}</td></tr>
                        </table>
                    </div>
                </div>
            </body>
            </html>
        `);
    
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
    
    // Toggle Managerial Assistance and recalc commission accordingly.
    managerialButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent page reload
        managerialAssistanceUsed = !managerialAssistanceUsed;
        this.innerText = managerialAssistanceUsed ? 'ASSISTED SALE' : 'NON-ASSISTED SALE';
        this.classList.toggle('assisted', managerialAssistanceUsed);
        this.classList.toggle('non-assisted', !managerialAssistanceUsed);
        document.getElementById('salesCommissionLabel').style.display = managerialAssistanceUsed ? 'block' : 'none';
        calculateCommission();
    });
    
    // Prevent negative values in the Other Expenses field.
    oeField.addEventListener('input', function() {
        if (parseFloat(oeField.value) < 0) {
            alert("Other Expenses cannot be negative.");
            oeField.value = 0;
        }
        // When the user manually changes OE, reset the stored original value and fee flag.
        oeField.removeAttribute('data-original');
        delete oeField.dataset.feeApplied;
    });
    
    // The main commission calculation function.
    function calculateCommission() {
        // Gather input values.
        const tp = parseFloat(document.getElementById('tp').value) || 0;
        const material = parseFloat(document.getElementById('material').value) || 0;
        const oeElem = document.getElementById('oe');
        const userOE = parseFloat(oeElem.value) || 0;
        const jobTypeSelect = document.getElementById('jobTypeSelect');
        const selectedOption = jobTypeSelect.options[jobTypeSelect.selectedIndex];
        
        // Store the original user-entered Other Expense if not already stored.
        let originalOE = parseFloat(oeElem.getAttribute('data-original'));
        if (isNaN(originalOE)) {
            originalOE = userOE;
            oeElem.setAttribute('data-original', originalOE);
        }
    
        // Calculate the extra fee for credit card, 3% of Total Price, if applicable.
        const creditCardFee = addCreditFee ? 0.03 * tp : 0;
        // Compute the new total Other Expenses using the original value plus the creditCardFee.
        const totalOE = originalOE + creditCardFee;
    
        // Update the Other Expenses field to show the updated total expenses only once.
        if (addCreditFee && !oeElem.dataset.feeApplied) {
            oeElem.value = totalOE;
            oeElem.dataset.feeApplied = "true";
        } else if (!addCreditFee) {
            // If credit card fee is not applied, restore the original Other Expense.
            oeElem.value = originalOE;
            delete oeElem.dataset.feeApplied;
        }
    
        // Gather labor and project data.
        const day1 = parseFloat(document.getElementById('day1').value) || 0;
        const day2 = parseFloat(document.getElementById('day2').value) || 0;
        const day3 = parseFloat(document.getElementById('day3').value) || 0;
        const day4 = parseFloat(document.getElementById('day4').value) || 0;
        const day5 = parseFloat(document.getElementById('day5').value) || 0;
        const ah = parseFloat(document.getElementById('ah').value) || 0;
        const toh = parseFloat(document.getElementById('toh').value) || 0;
        const pd = parseFloat(document.getElementById('pd').value) || 0;
    
        // Compute total hours.
        const totalHours = day1 + day2 + day3 + day4 + day5 + ah + (1.5 * toh);
        document.getElementById('totalHours').value = totalHours;
    
        // Compute gross amount (unchanged from original except we use 85 for labor).
        const grossAmount = tp - (material * 1.2) - (totalHours * 85) - totalOE;
    
        // Overheads => pd * 256
        const overheads = pd * 256;
    
        // First, figure out the "provisional" profit ignoring commission
        // We'll use it only if pd != 1 or if the job type doesn't override the baseCommission.
        let provisionalProfitPercentage = 0;
        if (tp !== 0) {
            provisionalProfitPercentage = ((grossAmount - overheads) / tp) * 100;
        }

        // =========================
        //   CUSTOM 1-HOUR LOGIC
        // =========================
        let baseCommission = 0;
        let jobDuration = 0;
        if (selectedOption && selectedOption.dataset.duration) {
            jobDuration = parseFloat(selectedOption.dataset.duration);
        }

        if (pd === 1) {
            // If user enters EXACTLY 1 hour for project duration, check the selected job's standard time
            if (jobDuration === 1) {
                // If the standard time is exactly 1 => baseCommission = $60
                baseCommission = 60;
            } else if (jobDuration > 1) {
                // Temporarily set baseCommission = 60
                // Then see if BPP% with $60 is more than 35%. If yes => baseCommission = 96
                // We'll do a quick check:
                let tempFinalProfit = grossAmount - overheads - 60; 
                let tempProfitPercentage = tp !== 0 ? (tempFinalProfit / tp) * 100 : 0;

                if (tempProfitPercentage > 35) {
                    baseCommission = 96;
                } else {
                    baseCommission = 60;
                }
            } else {
                // If jobDuration = 0 or not provided, fallback to the normal logic
                baseCommission = computeBaseCommissionByProfit(provisionalProfitPercentage, grossAmount);
            }
        } else {
            // Normal logic if pd != 1
            baseCommission = computeBaseCommissionByProfit(provisionalProfitPercentage, grossAmount);
        }
    
        // Managerial assistance: 2% of TP deducted from baseCommission
        let technicianCommission;
        if (managerialAssistanceUsed) {
            technicianCommission = baseCommission - (0.02 * tp);
            document.getElementById('salesCommission').textContent = (0.02 * tp).toFixed(2);
        } else {
            technicianCommission = baseCommission;
            document.getElementById('salesCommission').textContent = "0.00";
        }
    
        // Final profit & final profit percentage
        const finalProfit = grossAmount - overheads - baseCommission;
        const finalProfitPercentage = tp !== 0 ? (finalProfit / tp) * 100 : 0;
    
        // Format BPP (finalProfitPercentage) to 2 decimals + emoji
        let bppValue = `${finalProfitPercentage.toFixed(2)}%`;
        if (finalProfitPercentage < 10) {
            bppValue = "👎 JOB BUST";
        } else if (finalProfitPercentage >= 10 && finalProfitPercentage <= 19.99) {
            bppValue = "😬 MARGINAL";
        } else if (finalProfitPercentage >= 20 && finalProfitPercentage <= 29.99) {
            bppValue = "👍 GOOD";
        } else if (finalProfitPercentage >= 30 && finalProfitPercentage <= 39.99) {
            bppValue = "😀 NICE";
        } else if (finalProfitPercentage >= 40 && finalProfitPercentage <= 59.99) {
            bppValue = "⭐ GREAT";
        } else if (finalProfitPercentage >= 60) {
            bppValue = "🌟 EXCELLENT";
        }
        document.getElementById('bpp').value = bppValue;
    
        // Compute SW, etc. for display
        const sw = ((material * 1.2) / tp) * 100 || 0;
        document.getElementById('sw').value = sw.toFixed(2);
        document.getElementById('wh').value = sw.toFixed(2);
        document.getElementById('rd').value = sw.toFixed(2);
    
        // Finally, display the technician commission
        document.getElementById('totalCommission').textContent = '$' + technicianCommission.toFixed(2);
    }
    
    // Helper function for the normal base commission logic
    function computeBaseCommissionByProfit(profitPercentage, grossAmount) {
        if (profitPercentage >= 20) {
            return 0.2 * grossAmount;
        } else if (profitPercentage >= 15 && profitPercentage < 20) {
            return 0.175 * grossAmount;
        } else {
            return 0.15 * grossAmount;
        }
    }

    // Trigger recalculation when the Calculate button is clicked.
    document.getElementById('calculateBtn').addEventListener('click', calculateCommission);
    
    // Recalculate automatically on any input change.
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', calculateCommission);
    });
    
    // Adjust the Project Duration value based on specific thresholds (existing logic).
    document.getElementById("pd").addEventListener("input", function() {
        let duration = parseFloat(this.value);
        if (duration < 1) {
            alert("Project Duration cannot be less than 1 hour.");
            this.value = "";
        } else {
            if (duration >= 1.1 && duration <= 1.49) {
                this.value = 1.5;
            } else if (duration >= 1.51 && duration <= 1.99) {
                this.value = 2;
            } else if (duration >= 2.1 && duration <= 2.49) {
                this.value = 2.5;
            } else if (duration >= 2.51 && duration <= 2.99) {
                this.value = 3;
            }
            for (let i = 3; i <= 100; i++) {
                if (duration >= i + 0.1 && duration <= i + 0.49) {
                    this.value = (i + 0.5).toFixed(1);
                } else if (duration >= i + 0.51 && duration <= i + 0.99) {
                    this.value = (i + 1).toFixed(1);
                }
            }
        }
    });
    
    // Dynamically build the Job Type <select>, grouping by category
    function populateJobTypeDropdown() {
        const jobTypeSelect = document.getElementById("jobTypeSelect");
        
        // Group by category
        const categories = {};
        jobTypes.forEach(job => {
            // Only include items with a duration > 0
            if (job.duration && job.duration > 0) {
                if (!categories[job.category]) {
                    categories[job.category] = [];
                }
                categories[job.category].push(job);
            }
        });

        // For each category, create an <optgroup> in the dropdown
        for (const catName in categories) {
            const optGroup = document.createElement("optgroup");
            optGroup.label = catName;
            categories[catName].forEach(item => {
                const option = document.createElement("option");
                option.value = item.name;  // or a unique ID
                option.textContent = item.name;
                option.dataset.duration = item.duration;
                optGroup.appendChild(option);
            });
            jobTypeSelect.appendChild(optGroup);
        }
    }

    // Expose calculateCommission globally so handleAnswer can call it
    window.calculateCommission = calculateCommission;
});