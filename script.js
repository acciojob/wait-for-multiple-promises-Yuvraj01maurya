//your JS code here. If required.
// Function to create a Promise that resolves after a random time between min and max seconds
function createPromise(min, max) {
    const randomTime = Math.random() * (max - min) + min;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime.toFixed(3)); // Resolve with time taken, rounded to 3 decimal places
        }, randomTime * 1000); // Convert seconds to milliseconds
    });
}

// Function to create an array of 3 promises
function createPromises() {
    return [
        createPromise(1, 3),
        createPromise(1, 3),
        createPromise(1, 3)
    ];
}

// Function to update the table with the results
function updateTable(results) {
    const table = document.getElementById('your-table-id'); // Replace 'your-table-id' with the actual ID of your table

    // Loop through the rows and update them
    for (let i = 0; i < results.length; i++) {
        const row = table.rows[i + 1]; // Skip the first row (loading row)

        // Update the first column with Promise name (e.g., Promise 1, Promise 2, Promise 3)
        row.cells[0].textContent = 'Promise ' + (i + 1);

        // Update the second column with the time taken to resolve
        row.cells[1].textContent = results[i];
    }

    // Calculate and update the total time taken
    const totalTime = results.reduce((acc, time) => acc + parseFloat(time), 0);
    table.rows[4].cells[1].textContent = totalTime.toFixed(3);
}

// Add a loading row to the table
const table = document.getElementById('your-table-id'); // Replace 'your-table-id' with the actual ID of your table
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';

// Create an array of promises
const promises = createPromises();

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
    .then(results => {
        // Remove the loading row
        table.deleteRow(1);

        // Update the table with the results
        updateTable(results);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
