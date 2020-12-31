export async function loginUser(dispatch, loginPayload) {
  let token = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')).token
    : '';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`/api/auth/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      // if (data === null) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
    }

    // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    dispatch({ type: 'ERROR', payload: data });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
