export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
