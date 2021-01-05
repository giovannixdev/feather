import React, { useEffect } from 'react';
import TransactionViewRows, { StyledRow } from './TransactionViewRows';
import styled from 'styled-components';
import { useTransactions, getAllTransactions } from '../../../state';
const StyledTableWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: space-between;
  order: 3;
  border: lightgray 0.5px solid;
  background-color: lightgray;
  width: 100%;
  overflow-y: auto;
  border-radius: 0px 0px 5px 5px;
`;
const StyledHeaderBox = styled.div`
  border-color: #e5e5e5;
  height: 2.1rem;
  text-align: center;
  font-size: 1.2rem;

  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

const StyledHeaderRow = styled(StyledRow)`
  height: 2.4rem;
  width: calc(100%-20px);
  order: 2;
  z-index: 10000;
  background-color: lightgray;
  border-radius: 5px 5px 0px 0px;
`;
function TransactionViewTable() {
  // const [transactions, setTransactions] = useState(null);
  const { transactionsState, dispatch } = useTransactions();
  const { transactions } = transactionsState;

  useEffect(() => {
    async function fetchTransactions() {
      let user = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser')).user
        : '';
      const payload = {
        user_id: `${user._id}`,
        account_type: 'checking',
        account_description: `Test Bank`,
      };
      try {
        let response = await getAllTransactions(dispatch, payload);
        if (response.error) console.log(response.error); //whatever message handler for transaction feedback
        return;
      } catch (error) {
        // console.log(error);
      }
    }
    fetchTransactions();
  }, [getAllTransactions]);

  console.count('** TransactionsViewTable was render');

  return (
    <>
      <StyledHeaderRow>
        <StyledHeaderBox style={{ width: '10.5vw' }}>Date</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '7vw' }}>Type</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '8vw' }}>Frequency</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '7vw' }}>Amount</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '12vw' }}>Description</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '10vw' }}>Category</StyledHeaderBox>
        <StyledHeaderBox style={{ width: '5vw' }}>Actions</StyledHeaderBox>
      </StyledHeaderRow>
      <StyledTableWrapper>
        {/* <div>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div> */}
        {transactions
          ? transactions.map(transaction => (
              <TransactionViewRows tr={transaction} key={transaction._id} />
            ))
          : null}
      </StyledTableWrapper>
    </>
  );
}
export default TransactionViewTable;
