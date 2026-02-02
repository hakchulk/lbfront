// 오늘의 영양 비율
export const getPieChartData2 = () => {
  return {
    labels: ['단백질', '탄수화물', '식이섬유', '당류', '나트륨'],
    datasets: [
      {
        data: [30, 25, 15, 10, 20],
        backgroundColor: [
          '#d6cdea',
          '#e9b1f7',
          '#fcd0d0',
          '#cdebcf',
          '#f9cd9e',
        ],
        borderWidth: 1,
      },
    ],
  };
};

// 주간 섭취 칼로리
export const getBarChartData1 = () => {
  return {
    labels: [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ],
    datasets: [
      {
        label: '지난 주',
        data: [500, 520, 800, 230, 860, 720, 120],
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '이번 주',
        data: [480, 510, 730, 280, 830, 450, 210],
        backgroundColor: 'rgba(153, 102, 255, 0.4)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};
// -----------------------------------------------------------------

// Pie 차트 데이터 (각 데이터 포인트마다 다른 색상)
export const getPieChartData = () => {
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Weekly Sales',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

// 두 번째 바 차트 데이터
export const getBarChartData2 = () => {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [20, 35, 15, 45, 30, 25],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
};
