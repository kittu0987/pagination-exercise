// Globals for pagination
let currentPage = 0; // Current page index
const pageSize = 5;  // Number of items per page

// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchData(currentPage, pageSize);
});

// Fetch data with pagination
function fetchData(page, size) {
    const url = `http://localhost:8080/api/kids?page=${page}&size=${size}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            displayData(data.content); // Show data in table
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please check the console.');
        });
}

// Display data in table
function displayData(kids) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear old rows

    kids.forEach(kid => {
        const row = `
            <tr>
                <td>${kid.id}</td>
                <td>${kid.kidName}</td>
                <td>${kid.school}</td>
                <td>${kid.likes}</td>
                <td>
                    <button onclick="editKid(${kid.id}, '${kid.kidName}', '${kid.school}', ${kid.likes})">Edit</button>
                    <button onclick="deleteKid(${kid.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Add new kid data
document.getElementById('addKidForm').addEventListener('submit', event => {
    event.preventDefault();

    const kidName = document.getElementById('kidName').value;
    const school = document.getElementById('school').value;
    const likes = document.getElementById('likes').value;

    const kidData = { kidName, school, likes };

    fetch('http://localhost:8080/api/kids', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(kidData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add kid');
            }
            alert('Kid added successfully!');
            fetchData(currentPage, pageSize); // Refresh table
        })
        .catch(error => {
            console.error('Error adding kid:', error);
            alert('Error adding kid. Check console.');
        });

    // Clear form fields
    document.getElementById('addKidForm').reset();
});

// Delete kid data
function deleteKid(id) {
    const url = `http://localhost:8080/api/kids/${id}`;
    fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete: ${response.statusText}`);
            }
            alert('Kid deleted successfully!');
            fetchData(currentPage, pageSize); // Refresh table
        })
        .catch(error => {
            console.error('Error deleting kid:', error);
            alert('Error deleting kid. Check console.');
        });
}

// Edit kid data
function editKid(id, currentName, currentSchool, currentLikes) {
    const newName = prompt('Enter new name:', currentName);
    const newSchool = prompt('Enter new school:', currentSchool);
    const newLikes = prompt('Enter new likes:', currentLikes);

    if (newName && newSchool && newLikes) {
        const updatedKid = { kidName: newName, school: newSchool, likes: parseInt(newLikes, 10) };

        fetch(`http://localhost:8080/api/kids/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedKid),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update kid');
                }
                alert('Kid updated successfully!');
                fetchData(currentPage, pageSize); // Refresh table
            })
            .catch(error => {
                console.error('Error updating kid:', error);
                alert('Error updating kid. Check console.');
            });
    }
}
