import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.article`
  height: 20vw;
  width: 60vw;
`;

export default function LineChart(props) {
  // console.log('props.transactions', props.transactions);
  //sort by expense/bill or income
  //sort by month
  //aggregate
  const expenses = [];
  const income = [];
  props.transactions.forEach(transaction => {
    transaction['transaction_type_id'] === 'expense' ||
    transaction['transaction_type_id'] === 'bill'
      ? expenses.push(transaction)
      : income.push(transaction);
  });
  const sortedExpenses = expenses.sort((a, b) => {
    return new Date(a.transaction_date) > new Date(b.transaction_date) ? 1 : -1;
  });
  console.log('sortedExpenses', sortedExpenses);
  const expenseAmounts = sortedExpenses.map(expense => {
    return expense.amount;
  });
  console.log('expenseAmount', expenseAmounts);
  const sortedIncome = income.sort((a, b) => {
    return new Date(a.transaction_date) > new Date(b.transaction_date) ? 1 : -1;
  });
  console.log('sortedIncome', sortedIncome);
  const incomeAmounts = sortedIncome.map(income => {
    return income.amount;
  });
  console.log('incomeAmounts', incomeAmounts);

  let i = 0;
  while (
    new Date(sortedExpenses[i].transaction_date) <
    new Date(sortedIncome[0].transaction_date)
  ) {
    i++;
  }

  console.log('i', i);

  // console.log(
  //   new Date(sortedExpenses[0].transaction_date) <
  //     new Date(sortedIncome[0].transaction_date)
  // );

  const firstExpenseMonth = new Date(
    sortedExpenses[i].transaction_date
  ).getMonth();

  const firstIncomeMonth = new Date(
    sortedIncome[0].transaction_date
  ).getMonth();

  const months = [
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
    'Dec',
  ];
  const projMths = months
    .slice(firstExpenseMonth)
    .concat(months.slice(0, firstExpenseMonth));

  // const sortedShows = shows.sort((a, b) => {
  //   // console.log(a.date.slice(4));
  //   return a.date.slice(4) > b.date.slice(4) ? 1 : -1;
  // });

  const [dataChart, setDataChart] = useState({
    labels: projMths,
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
        data: expenseAmounts,
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
