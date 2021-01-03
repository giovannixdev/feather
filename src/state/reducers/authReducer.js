// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';

export const authInitialState = {
  userDetails: '' || user,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...prevState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...prevState,
        userDetails: action.payload.user,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        user: '',
      };

    case 'ERROR':
      return {
        ...prevState,
        loading: false,
        errorMessage: action.payload.error_message,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
