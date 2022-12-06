import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const registerUserRequest = async (body) =>
  await client.post('/register', body);
export const loginUserRequest = async (body) =>
  await client.post('/login', body);
