document.addEventListener("DOMContentLoaded", () => {
    // Fetch the from the json file with a timestamp to prevent caching
    fetch(`Json/data.json?timestamp=${new Date().getTime()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(jsonData => {
            // Sort the data by date (newest to oldest)
            const sortedData = sortDataByDate(jsonData);
            populateTable(sortedData);
        })
        .catch(error => {
            console.error("Error fetching JSON:", error);
        });

    // Populate the table with the html element
    function populateTable(data) {
        const table = document.querySelector("table");
        data.forEach(item => {
            const row = document.createElement("tr");
            Object.keys(item).forEach(key => {
                const cell = document.createElement("td");
                if (key === "link") {
                    if (item[key] === "Pending") {
                        cell.textContent = "Pending";
                    } else {
                        const anchor = document.createElement("a");
                        anchor.href = item[key];
                        anchor.textContent = "Visit";
                        anchor.target = "_blank";
                        cell.appendChild(anchor);
                    }
                } else {
                    cell.textContent = item[key];
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
    }

    // Function to sort the data by date (newest to oldest)
    function sortDataByDate(data) {
        return data.sort((a, b) => {
            // Handle "Ongoing" as the newest
            if (a.date === "Ongoing") return -1;
            if (b.date === "Ongoing") return 1;

            // Compare actual dates
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // Newest first
        });
    }
});
