import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.article`
  height: 20vw;
  width: 60vw;
`;

export default function LineChart() {
  const [dataChart, setDataChart] = useState({
    labels: [
      'Dec (Today)',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
    ],
    datasets: [
      {
        label: 'Balance',
        data: [
          1200,
          1900,
          1300,
          1500,
          1200,
          1300,
          1900,
          1300,
          1500,
          1200,
          1300,
          1100,
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 0.2)'],
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [200, 100, 100, 1500, 200, 1300, 900, 100, 1500, 200, 1300, 1100],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 0.2)'],
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: [200, 100, 100, 1500, 200, 1300, 900, 100, 1500, 200, 1300, 1100],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <ChartContainer>
      <Line
        data={dataChart}
        height={null}
        width={null}
        options={{ maintainAspectRatio: false }}
      />
    </ChartContainer>
  );
}
