// 첫 번째 바 차트 데이터
export const getBarChartData1 = () => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };
};

// Pie 차트 데이터 (각 데이터 포인트마다 다른 색상)
export const getPieChartData = () => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sales",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
};

// 두 번째 바 차트 데이터
export const getBarChartData2 = () => {
  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [20, 35, 15, 45, 30, 25],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }
    ]
  };
};
