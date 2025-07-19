const ctx = document.getElementById('revenueChart').getContext('2d');
const revenueData = document.getElementById('revenueChart').getAttribute('value');

const revenueChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: JSON.parse(revenueData).labels,
    datasets: [{
      label: 'Doanh thu (VNĐ)',
      data: JSON.parse(revenueData).values,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString('vi-VN') + 'đ';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});