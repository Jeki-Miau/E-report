
const ctx1 = document.getElementById('lineChart').getContext('2d');
new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [{
      label: 'Reports',
      data: [12, 19, 15, 22, 18, 25, 20, 30, 28, 35, 42],
      borderColor: '#6a8cff',
      backgroundColor: 'rgba(106, 140, 255, 0.1)',
      tension: 0.3,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { drawBorder: false } },
      x: { grid: { display: false } }
    }
  }
});

const ctx2 = document.getElementById('barChart').getContext('2d');
new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Finance', 'Marketing', 'IT', 'Product', 'HR'],
    datasets: [{
      label: 'Reports',
      data: [42, 58, 35, 29, 18],
      backgroundColor: [
        'rgba(106, 140, 255, 0.7)',
        'rgba(40, 190, 120, 0.7)',
        'rgba(255, 165, 0, 0.7)',
        'rgba(138, 43, 226, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderRadius: 6,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { drawBorder: false } },
      x: { grid: { display: false } }
    }
  }
});