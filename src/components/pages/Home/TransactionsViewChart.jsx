import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useTransactions } from '../../../state';

// const ChartContainer = styled.article`
//   height: 20vw;
//   width: 60vw;
// `;

function TransactionsViewChart() {
  const expenseMonthObj = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  const incomeMonthObj = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

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
  //Initializing sorted income and expense arrays, and sorting data
  const sortedExpenses = [];
  const sortedIncome = [];

  const { transactionsState } = useTransactions();
  const { transactions } = transactionsState;

  //initialize empty state before data retrieved from db
  const [dataChart, setDataChart] = useState({});

  useEffect(() => {
    if (transactions.length > 0) {
      transactions.forEach(transaction => {
        transaction.transaction_date = transaction.transaction_date.replace(
          /-/gi,
          '/'
        );
        transaction['transaction_type_id'] === 'expense' ||
          transaction['transaction_type_id'] === 'bill'
          ? sortedExpenses.push(transaction)
          : sortedIncome.push(transaction);
      });

      const startTransaction = new Date(transactions[0].transaction_date);

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

      sortedExpenses.forEach(expense => {
        for (let key in expenseMonthObj) {
          if (
            new Date(expense.transaction_date).toString().includes(key) &&
            new Date(expense.transaction_date) >= startDate &&
            new Date(expense.transaction_date) < endDate
          )
            expenseMonthObj[key] = Number(
              (expenseMonthObj[key] + expense.amount).toFixed(2)
            );
        }
      });

      sortedIncome.forEach(income => {
        for (let key in incomeMonthObj) {
          if (
            new Date(income.transaction_date).toString().includes(key) &&
            new Date(income.transaction_date) >= startDate &&
            new Date(income.transaction_date) < endDate
          )
            incomeMonthObj[key] = Number(
              (incomeMonthObj[key] + income.amount).toFixed(2)
            );
        }
      });

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
        let change = inc + expenseArray[i];
        return balanceArray[i - 1]
          ? balanceArray.push(Number((balanceArray[i - 1] + change).toFixed(2)))
          : balanceArray.push(Number(change.toFixed(2)));
      });
      setDataChart({
        labels: projMths,
        datasets: [
          {
            label: 'Balance',
            lineTension: 0.2,
            data: balanceArray,
            backgroundColor: ['rgba(255, 255, 255, 0)'],
            borderColor: ['rgba(0, 0, 0, 1)'],
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            lineTension: 0.05,
            data: expenseArray,
            backgroundColor: ['rgba(255, 3, 3, 0.2)'],
            borderColor: ['rgba(255, 3, 3, 0.2)'],
            borderWidth: 1,
          },
          {
            label: 'Income',
            lineTension: 0.05,
            data: incomeArray,
            backgroundColor: ['rgba(3, 172, 255, 0.2)'],
            borderColor: ['rgba(3, 172, 255, 0.2)'],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [transactionsState]);

  console.count('** TransactionsViewChart was render');

  return (
    <div
      style={{
        height: '20vw',
        width: '60vw',
      }}
    >
      {/* <ChartContainer> */}

      <Line
        data={dataChart}
        height={null}
        width={null}
        options={{
          elements: {
            point: {
              radius: 2,
            },
          },
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
      {/* </ChartContainer> */}
    </div>
  );
}

export default TransactionsViewChart;
