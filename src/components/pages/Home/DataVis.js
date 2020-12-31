import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.article`
  height: 20vw;
  width: 60vw;
`;

export default function LineChart(props) {
  const sortedExpenses = [];
  const sortedIncome = [];
  props.transactions.forEach(transaction => {
    transaction['transaction_type_id'] === 'expense' ||
    transaction['transaction_type_id'] === 'bill'
      ? sortedExpenses.push(transaction)
      : sortedIncome.push(transaction);
  });

  sortedExpenses.forEach(expense => {
    expense.transaction_date = expense.transaction_date.replace(/-/gi, '/');
  });

  sortedIncome.forEach(income => {
    income.transaction_date = income.transaction_date.replace(/-/gi, '/');
  });

  let i = 0;
  // OPTION IF SETTING VARIABLE BASED ON IF/ELSE CONDITIONAL
  // let startTransaction;

  if (
    new Date(sortedExpenses[0].transaction_date) <
    new Date(sortedIncome[0].transaction_date)
  ) {
    while (
      new Date(sortedExpenses[i].transaction_date) <
      new Date(sortedIncome[0].transaction_date)
    ) {
      i++;
      //OPTION IF SETTING VARIABLE BASED ON IF/ELSE CONDITIONAL
      // startTransaction = new Date(
      //   sortedExpenses[i].transaction_date
      // );
    }
  } else if (
    new Date(sortedIncome[0].transaction_date) <
    new Date(sortedExpenses[0].transaction_date)
  ) {
    while (
      new Date(sortedIncome[i].transaction_date) <
      new Date(sortedExpenses[0].transaction_date)
    ) {
      i++;
      // OPTION IF SETTING VARIABLE BASED ON IF/ELSE CONDITIONAL
      // startTransaction = new Date(sortedIncome[i].transaction_date);
    }
  }

  // CURRENT OPTION
  const startTransaction = new Date(sortedIncome[i].transaction_date);

  const startDate = new Date(
    startTransaction.getFullYear(),
    startTransaction.getMonth(),
    '01'
  );
  const endDate = new Date(
    startTransaction.getFullYear() + 1,
    startTransaction.getMonth(),
    '01'
  );

  const expenseMonthObj = {
    Jan: [],
    Feb: [],
    Mar: [],
    Apr: [],
    May: [],
    Jun: [],
    Jul: [],
    Aug: [],
    Sep: [],
    Oct: [],
    Nov: [],
    Dec: [],
  };

  const incomeMonthObj = {
    Jan: [],
    Feb: [],
    Mar: [],
    Apr: [],
    May: [],
    Jun: [],
    Jul: [],
    Aug: [],
    Sep: [],
    Oct: [],
    Nov: [],
    Dec: [],
  };

  sortedExpenses.forEach(expense => {
    for (let key in expenseMonthObj) {
      if (
        new Date(expense.transaction_date).toString().includes(key) &&
        new Date(expense.transaction_date) >= startDate &&
        new Date(expense.transaction_date) < endDate
      )
        expenseMonthObj[key].push(expense);
    }
  });

  sortedIncome.forEach(income => {
    for (let key in incomeMonthObj) {
      if (
        new Date(income.transaction_date).toString().includes(key) &&
        new Date(income.transaction_date) >= startDate &&
        new Date(income.transaction_date) < endDate
      )
        incomeMonthObj[key].push(income);
    }
  });

  Object.keys(expenseMonthObj).forEach(key => {
    const monthExpenseArrays = expenseMonthObj[key];
    let monthlyExpenses = 0;
    monthExpenseArrays.forEach(transaction => {
      monthlyExpenses += transaction.amount;
    });
    monthlyExpenses = Number(monthlyExpenses.toFixed(2));
    expenseMonthObj[key] = monthlyExpenses;
  });

  Object.keys(incomeMonthObj).forEach(key => {
    const monthIncomeArrays = incomeMonthObj[key];
    let monthlyIncome = 0;
    monthIncomeArrays.forEach(transaction => {
      monthlyIncome += transaction.amount;
    });
    monthlyIncome = Number(monthlyIncome.toFixed(2));
    incomeMonthObj[key] = monthlyIncome;
  });

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

  const mthIdx = startTransaction.getMonth();

  const projMths = months.slice(mthIdx).concat(months.slice(0, mthIdx));

  const expenseArray = projMths.map(mth => {
    return expenseMonthObj[mth];
  });
  const incomeArray = projMths.map(mth => {
    return incomeMonthObj[mth];
  });
  const balanceArray = [];
  incomeArray.forEach((inc, i) => {
    let change = inc - expenseArray[i];
    return balanceArray[i - 1]
      ? balanceArray.push(Number((balanceArray[i - 1] + change).toFixed(2)))
      : balanceArray.push(Number(change.toFixed(2)));
  });

  const [dataChart, setDataChart] = useState({
    labels: projMths,
    datasets: [
      {
        label: 'Balance',
        data: balanceArray,
        backgroundColor: ['rgba(255, 255, 255, 0)'],
        borderColor: ['rgba(0, 0, 0, 1)'],
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: expenseArray,
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 0.2)'],
        borderWidth: 1,
      },
      {
        label: 'Income',
        data: incomeArray,
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 0.2)'],
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
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </ChartContainer>
  );
}
