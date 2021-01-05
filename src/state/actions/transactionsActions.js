function getToken() {
  return localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).token
    : '';
}

function getUserID() {
  return localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).user._id
    : '';
}

export async function getAllTransactions(dispatch, transactionsPayload) {
  let token = getToken();

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
    else return dispatch({ type: 'ERROR', payload: data });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
}

export async function postTransactions(dispatch, transactionsPayload) {
  let token = getToken();

  const url = '/api/transactions/post';
  let id = getUserID();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...transactionsPayload,
      user_id: id,
      account_type: 'checking',
      account_description: 'Test Bank',
    }),
  };

  try {
    let response = await fetch(url, requestOptions);
    let data = await response.json();
    if (!data.error_message)
      return dispatch({ type: 'POST_TRANSACTIONS', payload: data });
    else return dispatch({ type: 'ERROR', payload: data });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
}

export async function deleteTransactions(dispatch, payload) {
  console.log('transactionsPayload in delete -> ', payload);
  let token = getToken();

  const url = '/api/transactions/delete';

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...payload,
    }),
  };

  try {
    let response = await fetch(url, requestOptions);
    let data = await response.json();
    console.log('data in deleteTransactions is: ', data);
    if (!data.error_message)
      return dispatch({ type: 'DELETE_TRANSACTIONS', payload: data });
    else return dispatch({ type: 'ERROR', payload: data });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
}
