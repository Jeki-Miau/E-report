// Cek login
if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'index.html';
}

// Logout
document.getElementById('logoutLink').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const duration = 2000;
  const stepTime = duration / (target || 1);
  const timer = setInterval(() => {
    count++;
    counter.textContent = count + (target > 99 ? '+' : '');
    if (count >= target) {
      clearInterval(timer);
      counter.textContent = target + (target > 99 ? '+' : '');
    }
  }, stepTime);
});

// Data Reports (dari localStorage atau default)
let reports = JSON.parse(localStorage.getItem('reports')) || [
  { id: 1, title: "Q3 Financial Summary", category: "Finance", status: "Done", date: "2025-10-28" },
  { id: 2, title: "User Engagement Report", category: "Marketing", status: "Pending", date: "2025-11-01" },
  { id: 3, title: "System Audit Log", category: "IT", status: "Done", date: "2025-10-30" },
  { id: 4, title: "Product Feedback Summary", category: "Product", status: "Done", date: "2025-11-02" },
  { id: 5, title: "Monthly Traffic Analytics", category: "Marketing", status: "Pending", date: "2025-11-03" }
];

function saveReports() {
  localStorage.setItem('reports', JSON.stringify(reports));
}

// Render Tabel
function renderTable() {
  const tbody = document.querySelector('#reportTable tbody');
  tbody.innerHTML = '';
  reports.forEach(report => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${report.id}</td>
      <td>${report.title}</td>
      <td>${report.category}</td>
      <td><span class="badge bg-${report.status === 'Done' ? 'success' : 'warning text-dark'}">${report.status}</span></td>
      <td>${new Date(report.date).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary me-1 edit-btn" data-id="${report.id}">Edit</button>
        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${report.id}">Del</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Delete Button
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      reports = reports.filter(r => r.id !== id);
      saveReports();
      renderTable();
    });
  });

  // ✅ EDIT BUTTON (baru)
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      const report = reports.find(r => r.id === id);
      if (!report) return;

      document.getElementById('editId').value = report.id;
      document.getElementById('editTitle').value = report.title;
      document.getElementById('editCategory').value = report.category;
      document.getElementById('editStatus').value = report.status;
      document.getElementById('editDate').value = report.date;

      const modal = new bootstrap.Modal(document.getElementById('editModal'));
      modal.show();
    });
  });
}

// Save Edit
document.getElementById('saveEditBtn').addEventListener('click', () => {
  const id = +document.getElementById('editId').value;
  const title = document.getElementById('editTitle').value.trim();
  const category = document.getElementById('editCategory').value.trim();
  const status = document.getElementById('editStatus').value;
  const date = document.getElementById('editDate').value;

  if (!title || !category || !date) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { id, title, category, status, date };
    saveReports();
    renderTable();
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    alert("Laporan berhasil diupdate!");
  }
});

// Add Report
document.getElementById('addReportBtn').addEventListener('click', () => {
  const title = prompt("Judul laporan:");
  if (!title) return;
  const category = prompt("Kategori (e.g., Finance, Marketing):", "General");
  const status = confirm("Tandai sebagai Selesai?") ? "Done" : "Pending";
  
  const newReport = {
    id: reports.length ? Math.max(...reports.map(r => r.id)) + 1 : 1,
    title,
    category,
    status,
    date: new Date().toISOString().split('T')[0]
  };
  reports.push(newReport);
  saveReports();
  renderTable();
});

// Live Search
document.getElementById('searchInput').addEventListener('input', () => {
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('#reportTable tbody tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});

// Render awal
renderTable();