// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';

// const sendData = () => {
//   axios
//     .post(url, loginInfo)
//     .then(res => setLoginMessage(res.data))
//     .catch(err => console.log(`Error from RenderLogin -> ${err}`));
// };

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`/api/auth/login`, requestOptions);
    let data = await response.json();
    console.log('data error ->', data);

    if (data.user) {
      // if (data === null) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }

    // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    dispatch({ type: 'LOGIN_ERROR', payload: data });

    return data;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', payload: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
