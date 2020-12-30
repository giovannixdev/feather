export async function getAllTransactions(dispatch, transactionsPayload) {
  let token = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).auth_token
    : '';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify(transactionsPayload),
  };

  try {
    let response = await fetch(`api/transactions/getAll`, requestOptions);
    let data = await response.json();
    if (!data.error_message)
      return dispatch({ type: 'GET_ALL_TRANSACTIONS', payload: data });
    else return dispatch({ type: 'TRANSACTIONS_ERROR', payload: data });
  } catch (error) {
    dispatch({ type: 'TRANSACTIONS_ERROR', payload: error });
  }
}
