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

  sortedExpenses.forEach(expense => {
    expense.transaction_date = expense.transaction_date.replace(/-/gi, '/');
  });

  const expenseAmounts = sortedExpenses.map(expense => {
    return expense.amount;
  });

  const sortedIncome = income.sort((a, b) => {
    return new Date(a.transaction_date) > new Date(b.transaction_date) ? 1 : -1;
  });

  sortedIncome.forEach(income => {
    income.transaction_date = income.transaction_date.replace(/-/gi, '/');
  });

  const incomeAmounts = sortedIncome.map(income => {
    return income.amount;
  });

  console.log('expenses', sortedExpenses);
  console.log('income', sortedIncome);

  let i = 0;
  // OPTION IF SETTING VARIABLE BASED ON IF/ELSE CONDITIONAL
  // let startTransaction;

  if (
    new Date(sortedExpenses[0].transaction_date) <
    new Date(sortedIncome[0].transaction_date)
  ) {
    console.log('expenses begin first');
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
    console.log('income begin first');
    while (
      new Date(sortedIncome[i].transaction_date) <
      new Date(sortedExpenses[0].transaction_date)
    ) {
      i++;
      // OPTION IF SETTING VARIABLE BASED ON IF/ELSE CONDITIONAL
      // startTransaction = new Date(sortedIncome[i].transaction_date);
    }
  }

  console.log('i', i);

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
  console.log('startDate', startDate);
  console.log('endDate', endDate);

  // FIRST EXPENSE MONTH
  // const firstExpenseMonth = new Date(sortedExpenses[0].transaction_date);
  // const firstIncomeMonth = new Date(sortedIncome[0].transaction_date);
  // console.log('first', firstExpenseMonth, firstIncomeMonth);
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

  console.log('expenseMonthObj', expenseMonthObj);

  Object.keys(expenseMonthObj).forEach(key => {
    const monthExpenseArrays = expenseMonthObj[key];
    let monthlyExpenses = 0;
    monthExpenseArrays.forEach(transaction => {
      monthlyExpenses += transaction.amount;
    });
    monthlyExpenses = Number(monthlyExpenses.toFixed(2));
    // console.log('Expense', key, monthlyExpenses);
    expenseMonthObj[key] = monthlyExpenses;
  });

  Object.keys(incomeMonthObj).forEach(key => {
    const monthIncomeArrays = incomeMonthObj[key];
    let monthlyIncome = 0;
    monthIncomeArrays.forEach(transaction => {
      monthlyIncome += transaction.amount;
    });
    monthlyIncome = Number(monthlyIncome.toFixed(2));
    // console.log('Income', key, monthlyIncome);
    incomeMonthObj[key] = monthlyIncome;
  });

  console.log('expenseMonthObj', expenseMonthObj);
  console.log('incomeMonthObj', incomeMonthObj);

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
  console.log(balanceArray);

  const [dataChart, setDataChart] = useState({
    labels: projMths,
    datasets: [
      {
        label: 'Balance',
        data: balanceArray,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 0.2)'],
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
