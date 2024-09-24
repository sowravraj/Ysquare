import axios from "axios";
import { getUserData } from './Storage'; // Adjust the path if needed

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyC4huvv9YuYp-ai-uNWqT6BCxuUGuD3aLo";
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;

const handleFirebaseError = (error) => {
  switch (error?.error?.message) {
    case 'EMAIL_EXISTS':
      return 'This email is already in use. Please use a different email.';
    case 'WEAK_PASSWORD':
      return 'The password is too weak. Please choose a stronger password.';
    case 'INVALID_PASSWORD':
      return 'Incorrect password. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const RegisterApi = async ({ name, email, password }) => {
  try {
    const response = await axios.post(REGISTER_URL, {
      email,
      password,
      returnSecureToken: true, // Optional: If you want to get an ID token
    });

    // Store the ID token in local storage or handle it as needed
    const idToken = response.data.idToken; 
    localStorage.setItem('idToken', idToken);

    return response.data; // Return the user data or any other relevant data
  } catch (error) {
    const message = handleFirebaseError(error.response?.data || error.message);
    console.error("Registration error:", message);
    throw new Error(message);
  }
};



export const LoginApi = (inputs) => {
  let data = { email: inputs.email, password: inputs.password };
  return axios.post(LOGIN_URL, data)
    .catch((error) => {
      const message = handleFirebaseError(error.response?.data || error.message);
      console.error('Login error:', message);
      throw new Error(message);
    });
};

export const UserDetailsApi = () => {
  const idToken = getUserData();
  if (!idToken) {
    throw new Error("User is not authenticated");
  }
  return axios.post(USER_DETAILS_URL, { idToken })
    .catch((error) => {
      const message = handleFirebaseError(error.response?.data || error.message);
      console.error('Error fetching user details:', message);
      throw new Error(message);
    });
};
