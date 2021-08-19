export const apiConfig = {
  baseURL: 'https://api.github.com/',
  headers: { Authorization: `token ${process.env.REACT_APP_TOKEN}` },
};
