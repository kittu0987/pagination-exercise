const apiUrl = 'http://localhost:8080/api/kids';
let currentPage = 0;
const pageSize = 5;

document.getElementById('getDataBtn').addEventListener('click', () => fetchData(currentPage));
document.getElementById('addDataBtn').addEventListener('click', showAddForm);
document.getElementById('prevPage').addEventListener('click', () => fetchData(--currentPage));
document.getElementById('nextPage').addEventListener('click', () => fetchData(++currentPage));
document.getElementById('cancelBtn').addEventListener('click', () => toggleForm(false));

const kidTableBody = document.querySelector('#kidTable tbody');
const formContainer = document.getElementById('formContainer');
const kidForm = document.getElementById('kidForm');

function fetchData(page) {
    fetch(`${apiUrl}?page=${page}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            populateTable(data.content);
            updatePagination(data.number, data.totalPages);
        })
        .catch(error => console.error('Fetch error:', error));
}

function populateTable(kids) {
    kidTableBody.innerHTML = '';
    kids.forEach(kid => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${kid.id}</td>
            <td>${kid.kidName}</td>
            <td>${kid.kidProfilePath}</td>
            <td>${kid.school}</td>
            <td>${kid.likes}</td>
            <td>${kid.filename}</td>
            <td>
                <button onclick="editKid(${kid.id})">Edit</button>
                <button onclick="deleteKid(${kid.id})">Delete</button>
            </td>
        `;
        kidTableBody.appendChild(row);
    });
}

function updatePagination(page, totalPages) {
    currentPage = page;
    document.getElementById('currentPage').innerText = page + 1;
    document.getElementById('prevPage').disabled = page === 0;
    document.getElementById('nextPage').disabled = page === totalPages - 1;
}

function showAddForm() {
    kidForm.reset();
    document.getElementById('formTitle').innerText = 'Add Kid Data';
    toggleForm(true);
}

function editKid(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('kidId').value = data.id;
            document.getElementById('kidName').value = data.kidName;
            document.getElementById('kidProfilePath').value = data.kidProfilePath;
            document.getElementById('school').value = data.school;
            document.getElementById('likes').value = data.likes;
            document.getElementById('filename').value = data.filename;
            document.getElementById('formTitle').innerText = 'Edit Kid Data';
            toggleForm(true);
        });
}

function deleteKid(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => fetchData(currentPage))
        .catch(error => console.error('Delete error:', error));
}

kidForm.addEventListener('submit', event => {
    event.preventDefault();
    const id = document.getElementById('kidId').value;
    const kidData = {
        kidName: document.getElementById('kidName').value,
        kidProfilePath: document.getElementById('kidProfilePath').value,
        school: document.getElementById('school').value,
        likes: parseInt(document.getElementById('likes').value),
        filename: document.getElementById('filename').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kidData)
    })
        .then(() => {
            fetchData(currentPage);
            toggleForm(false);
        })
        .catch(error => console.error('Save error:', error));
});

function toggleForm(show) {
    formContainer.style.display = show ? 'block' : 'none';
}
